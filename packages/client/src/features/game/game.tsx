import { useRef, useEffect, memo } from 'react';
import { Timer } from './timer';
import { setupKeyboard } from './input';
import { createCollisionLayer } from './layers';
import { loadEntities } from './enteties';
import { gameApi } from '@/api';
import { fetchLevel } from '@/controllers/game-controllers';

function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      const res = await gameApi.loadSprites('enemy');

      console.warn(res);
    })();

    if (ref.current) {
      const ctx = ref.current.getContext('2d');

      (async function main(ctx: CanvasRenderingContext2D | null) {
        const entityFactory = await loadEntities();
        const loadLevel = await fetchLevel(entityFactory);

        const level = await loadLevel('1-1');

        const tank = entityFactory.tank();
        tank.pos.set(60, 230);
        level.entities.add(tank);

        // level.comp.push(createCollisionLayer(level));

        const input = setupKeyboard(tank);
        input.listenTo(window);

        const timer = new Timer();

        timer.update = function update(deltaTime: number) {
          level.update(deltaTime);
          level.comp.draw(ctx);
        };

        timer.start();
      })(ctx);
    }
  }, []);

  return <canvas className="game" ref={ref} id="screen" width="260px" height="260px" />;
}

export default memo(Game, () => false);
