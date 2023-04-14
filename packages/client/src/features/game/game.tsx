import { useRef, useEffect, memo } from 'react';
import { Timer } from './timer';
import { setupKeyboard } from './input';
import { loadEntities } from './enteties';
import { fetchLevel } from '@/controllers/game-controllers';
import { Entity } from './entity';
import { PlayerController } from './traits/player-controller';
import { createCollisionLayer } from './layers';

const createPlayerEnv = (playerEntity: Entity) => {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(60, 232);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);

  return playerEnv;
};

function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    const timer = new Timer();

    (async function main(ctx: CanvasRenderingContext2D | undefined | null) {
      if (!ctx) {
        return;
      }
      const entityFactory = await loadEntities();
      const loadLevel = await fetchLevel(entityFactory);

      const level = await loadLevel('1-1');

      const tank = entityFactory.tank();

      const playerEnv = createPlayerEnv(tank);
      level.entities.add(playerEnv);

      // level.comp.push(createCollisionLayer(level));

      const input = setupKeyboard(tank, level, entityFactory);
      input.listenTo(window);

      timer.update = function update(deltaTime: number) {
        level.update(deltaTime);
        level.comp.draw(ctx);
      };
    })(ctx);

    timer.start();

    return () => {
      timer.cancel();
    };
  }, []);

  return <canvas className="game" ref={canvasRef} id="screen" width="260px" height="260px" />;
}

export default memo(Game, () => false);
