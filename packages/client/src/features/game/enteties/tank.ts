import { SIDES } from '../constants';
import { Entity } from '../entity';
import { SpriteSheet } from '../spritesheet';
import { Go } from '../traits/go';

function createTankFactory(sprite: SpriteSheet) {
  let runAnim = sprite.animations.get('run-top');

  function obstructTank(entity: Entity) {
    return function obstruct(side: SIDES) {
      const go = entity.getTrait('go') as Go;
      if (go) {
        go.side = side;
      }
      runAnim = sprite.animations.get(`run-${side}`);
    };
  }

  function routeFrame(tank: Entity) {
    const go = tank.getTrait('go') as Go;

    return runAnim ? runAnim(Math.abs(go.direction)) : '';
  }

  function drawTank(entity: Entity) {
    return function draw(ctx: CanvasRenderingContext2D | null) {
      sprite.draw(routeFrame(entity), ctx, entity.pos.x, entity.pos.y);
    };
  }

  return function createTank() {
    const tank = new Entity();

    tank.offset.set(1, 1);
    tank.size.set(14, 14);
    tank.addTrait(new Go());

    tank.draw = drawTank(tank);
    tank.obstruct = obstructTank(tank);

    return tank;
  };
}

export { createTankFactory };
