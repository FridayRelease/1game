import { fetchFont, fetchLevel } from '@/controllers/game-controllers';
import { RefObject, useState, useEffect, ReactEventHandler } from 'react';
import { loadEntities } from '../loaders/enteties';
import { setupKeyboard } from '../input';
import { createDashboardLayer } from '../layers';
import { createCollisionLayer } from '../layers/collision';
import { createPlayerEnv } from '../player';
import { SceneRunner } from '../scene-runner';
import { Timer } from '../timer';
import { createPlayer, Player } from '../traits/player';
import { GameContext } from '../types';
import { createColorLayer } from '../layers/color';
import { Level } from '../level';
import { Traits } from '@/constant/traits';
import { Scene } from '../scene';
import { createTextLayer } from '../layers/text';
import TimedScene from '../timed-scene';
import { createPlayerProgressLayer } from '../layers/player-progress';

const random = (arr: number[][]): number[] => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

function useStart(canvasRef: RefObject<HTMLCanvasElement>): {
  isStarted: boolean;
  start: ReactEventHandler<HTMLButtonElement>;
} {
  const [isStarted, setStart] = useState(false);
  const timer = new Timer();

  async function main(videoContext: CanvasRenderingContext2D | undefined | null) {
    if (!videoContext) {
      return;
    }
    const font = await fetchFont();
    const audioContext = new AudioContext();

    const entetiesFactory = await loadEntities(audioContext);
    const loadLevel = await fetchLevel(entetiesFactory);

    const sceneRunner = new SceneRunner();

    const tank = createPlayer(entetiesFactory.tank());

    const input = setupKeyboard(tank);
    input.listenTo(window);

    const runLevel = async (name: string) => {
      const loadScreen = new Scene();
      loadScreen.comp.push(createColorLayer('#757575'));
      loadScreen.comp.push(createTextLayer(font, `stage ${name}`));
      sceneRunner.addScene(loadScreen);
      sceneRunner.next();

      const level = await loadLevel(name);

      const trigger = level.triggers.get('entity');

      (tank.getTrait(Traits.Player) as Player).enemiesCount = trigger?.count || 4;

      level.events.on(Level.EVENT_TRIGGER, (type: string) => {
        const trigger = level.triggers.get(type);

        if (trigger && type === 'goto') {
          runLevel(trigger.name);
        }

        if (trigger && type === 'entity') {
          const createTriggerEntity = entetiesFactory[trigger.name];

          const enemy = createTriggerEntity();

          const pos = trigger.pos ? random(trigger.pos) : [10, 10];
          enemy.pos.set(pos[0], pos[1]);

          level.entities.add(enemy);
        }
      });

      const playerEnv = createPlayerEnv(tank);
      level.entities.add(playerEnv);

      const playerProgressLayer = createPlayerProgressLayer(font, level);
      const dashboardLayer = createDashboardLayer(font, level);

      const waitScreen = new TimedScene();
      waitScreen.countDown = 2;
      waitScreen.comp.push(createColorLayer('#757575'));
      waitScreen.comp.push(playerProgressLayer);
      sceneRunner.addScene(waitScreen);

      level.comp.push(createCollisionLayer(level));
      level.comp.push(dashboardLayer);
      sceneRunner.addScene(level);

      sceneRunner.next();
    };

    const gameContext: GameContext = {
      deltaTime: 0,
      audioContext,
      videoContext,
      entetiesFactory,
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
