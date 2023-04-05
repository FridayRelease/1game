import { SIDES } from '../constants';
import { Entity } from '../entity';
import { SpriteSheet } from '../spritesheet';
import { Go } from '../traits/go';

function createEnemyFactory(sprite: SpriteSheet) {
  let runAnim = sprite.animations.get('run-bottom');

  function obstructEnemy(entity: Entity) {
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

  function drawEnemy(entity: Entity) {
    return function draw(ctx: CanvasRenderingContext2D | null) {
      sprite.draw(routeFrame(entity), ctx, entity.pos.x, entity.pos.y);
    };
  }

  return function createEnemy() {
    const enemy = new Entity();

    enemy.size.set(16, 16);
    enemy.addTrait(new Go());
    (enemy.getTrait('go') as Go).directionY = 1;
    (enemy.getTrait('go') as Go).side = SIDES.BOTTOM;

    enemy.draw = drawEnemy(enemy);
    enemy.obstruct = obstructEnemy(enemy);

    return enemy;
  };
}

export { createEnemyFactory };
