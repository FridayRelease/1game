import { Traits } from '@/constant/traits';
import { fetchFont, fetchLevel } from '@/controllers/game-controllers';
import { RefObject, useState, useEffect, ReactEventHandler } from 'react';
import { loadEntities } from '../loaders/enteties';
import { setupKeyboard } from '../input';
import { createDashboardLayer } from '../layers';
import { createCollisionLayer } from '../layers/collision';
import { createPlayerEnv } from '../player';
import { SceneRunner } from '../scene-runner';
import { Timer } from '../timer';
import { createPlayer, getPlayerTrait, Player } from '../traits/player';
import { GameContext } from '../types';
import { createColorLayer } from '../layers/color';
import { Level } from '../level';
import { Scene } from '../scene';
import { createTextLayer } from '../layers/text';
import TimedScene from '../timed-scene';
import { createPlayerProgressLayer } from '../layers/player-progress';
import { gameActions } from '../store/game-slice';
import { useDispatch } from 'react-redux';
import {addUserDatasToServer, setUserDatasToStore} from "@/controllers/lider-controller";
import {ILeaderboardAddUser} from "@/api/types";

const random = (arr: number[][]): number[] => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

/**
 * tiles - отрисовка всех элементов игры
 * enteties - все юниты игры(танки, пули, орла)
 * level (движок игры)
 *
 * entitiesFactory - фабрика функций с замыканием tiles
 */

function useStart(canvasRef: RefObject<HTMLCanvasElement>): {
  isStarted: boolean;
  start: ReactEventHandler<HTMLButtonElement>;
} {
  const [isStarted, setStart] = useState(false);
  const dispatch = useDispatch();

  const timer = new Timer();

  async function main(videoContext: CanvasRenderingContext2D | undefined | null) {
    if (!videoContext) {
      return;
    }
    const font = await fetchFont();
    const audioContext = new AudioContext();

    const entitiesFactory = await loadEntities(audioContext);
    const loadLevel = await fetchLevel(entitiesFactory);

    const sceneRunner = new SceneRunner();

    const tank = createPlayer(entitiesFactory.tank());
    const eagle = entitiesFactory.eagle();
    eagle.pos.set(120, 232);

    const input = setupKeyboard(tank);
    input.listenTo(window);

    const gameOver = async (score?: number) => {
      dispatch(gameActions.setScore(score || 0));

      const waitScreen = new TimedScene();
      waitScreen.countDown = 2;
      waitScreen.comp.push(createColorLayer('#757575'));
      waitScreen.comp.push(createTextLayer(font, 'game over!'));

      sceneRunner.addScene(waitScreen);

      const loadScreen = new Scene();
      loadScreen.comp.push(createColorLayer('#757575'));
      loadScreen.comp.push(createTextLayer(font, `Dashboard with score, ${score}`));
      sceneRunner.addScene(loadScreen);
      sceneRunner.next();

      // добавить главное меню
    };

    const runLevel = async (name: string) => {
      const loadScreen = new TimedScene();
      loadScreen.comp.push(createColorLayer('#757575'));
      loadScreen.comp.push(createTextLayer(font, `stage ${name}`));
      sceneRunner.addScene(loadScreen);

      const level = await loadLevel(name);

      level.entities.add(eagle);

      const trigger = level.triggers.get('entity');

      (tank.getTrait(Traits.Player) as Player).enemiesCount = trigger?.count || 4;

      level.events.on(Level.EVENT_TRIGGER, (type: string) => {
        if (type === 'gameOver') {
          const player = getPlayerTrait(level.entities);
          if (player!==undefined){
            const data = {name:player.NAME, score:player.score}
            const info:ILeaderboardAddUser = {
              "data": data,
              "ratingFieldName": "score",
              "teamName": "1game"
            }
            console.log('file use-start data {name, score} to server', data)
            setUserDatasToStore(data,dispatch);//запись в Store
            console.log('Данные игрока и очки в Стор записали')
            try{
              addUserDatasToServer(info);// Запись на Сервер
              console.log('Данные игрока и очки в Сервер записали')
            }catch (e) {
              console.log('Ошибка записи на сервер результатов Игрока', e)
            }
          }
          gameOver(player?.score);
        }

        const trigger = level.triggers.get(type);

        if (trigger && type === 'goto') {
          runLevel(trigger.name);
        }

        if (trigger && type === 'entity') {
          const createTriggerEntity = entitiesFactory[trigger.name];

          const enemy = createTriggerEntity();

          const pos = trigger.pos ? random(trigger.pos) : [10, 10];
          enemy.pos.set(pos[0], pos[1]);

          level.entities.add(enemy);
        }
      });

      const playerEnv = createPlayerEnv(tank);
      level.entities.add(playerEnv);

      const waitScreen = new TimedScene();
      waitScreen.countDown = 2;
      waitScreen.comp.push(createColorLayer('#757575'));
      waitScreen.comp.push(createPlayerProgressLayer(font, level));
      sceneRunner.addScene(waitScreen);

      level.comp.push(createCollisionLayer(level));
      level.comp.push(createDashboardLayer(font, level));
      sceneRunner.addScene(level);

      sceneRunner.next();
    };

    const gameContext: GameContext = {
      deltaTime: 0,
      audioContext,
      videoContext,
      entitiesFactory,
    };

    timer.update = function update(deltaTime: number) {
      gameContext.deltaTime = deltaTime;

      sceneRunner.update(gameContext);
    };
    runLevel('1-1');
    // level.music.player?.playTrack('levelstarting');
  }

  const start = () => {
    const ctx = canvasRef.current?.getContext('2d');

    main(ctx);
    timer.start();

    setStart(true);
  };

  useEffect(() => {
    return () => {
      timer.cancel();
    };
  }, []);

  return { isStarted, start };
}

export { useStart };
