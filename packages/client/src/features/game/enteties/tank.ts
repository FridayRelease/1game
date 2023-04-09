import { SIDES } from '../constants';
import { Entity } from '../entity';
import { SpriteSheet } from '../spritesheet';
import { Go } from '../traits/go';

function createTankFactory(sprite: SpriteSheet) {
  let runAnim = sprite.animations.get('run-top');

  function directTank(entity: Entity) {
    return function direct(side: SIDES) {
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
    // tank.addTrait({
    //   NAME: 'Action',
    //   update: function (): void {
    //     console.warn('update');
    //   },
    //   obstruct: function (entity: Entity, side: SIDES): void {
    //     console.warn('obstruct', entity, side);
    //   },
    //   direct: function (entity: Entity, side: SIDES): void {
    //     throw new Error('Function not implemented.');
    //   },
    //   collides: function (entity: Entity, canditate: Entity): void {
    //     throw new Error('Function not implemented.');
    //   },
    // });

    tank.draw = drawTank(tank);
    tank.direct = directTank(tank);

    return tank;
  };
}

export { createTankFactory };
