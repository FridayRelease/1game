import { Traits } from '@/constant/traits';
import { fetchFont, fetchLevel } from '@/controllers/game-controllers';
import { RefObject, useState, useEffect, ReactEventHandler } from 'react';
import { loadEntities } from '../enteties';
import { Entity } from '../entity';
import { setupKeyboard } from '../input';
import { createDashboardLayer } from '../layers';
import { Timer } from '../timer';
import { PlayerController } from '../traits/player-controller';
import { GameContext } from '../types';

const createPlayerEnv = (playerEntity: Entity) => {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(60, 232);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);

  return playerEnv;
};

function useStart(canvasRef: RefObject<HTMLCanvasElement>): {
  isStarted: boolean;
  start: ReactEventHandler<HTMLButtonElement>;
} {
  const [isStarted, setStart] = useState(false);
  const timer = new Timer();

  async function main(ctx: CanvasRenderingContext2D | undefined | null) {
    if (!ctx) {
      return;
    }
    const font = await fetchFont();
    const audioContext = new AudioContext();

    const entityFactory = await loadEntities(audioContext);
    const loadLevel = await fetchLevel(entityFactory);

    const level = await loadLevel('1-1');

    const tank = entityFactory.tank();

    const playerEnv = createPlayerEnv(tank);
    level.entities.add(playerEnv);

    level.comp.push(createDashboardLayer(font, playerEnv.getTrait(Traits.PlayerController) as PlayerController));
    // level.comp.push(createCollisionLayer(level));

    const input = setupKeyboard(tank);
    input.listenTo(window);

    const gameContext: GameContext = {
      deltaTime: 0,
      audioContext,
      entityFactory,
    };

    timer.update = function update(deltaTime: number) {
      gameContext.deltaTime = deltaTime;

      level.update(gameContext);
      level.comp.draw(ctx);
    };
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
