import { SIDES } from '../constants';
import { Entity } from '../entity';
import { SpriteSheet } from '../spritesheet';
import { Behavior } from '../traits/behavior';
import { Enemy } from '../traits/enemy';
import { Go } from '../traits/go';
import { Killable } from '../traits/killable';
import { Physics } from '../traits/physics';
import { Solid } from '../traits/solid';

function createEnemyFactory(sprite: SpriteSheet) {
  let runAnim = sprite.animations.get('run-bottom');

  function routeFrame(tank: Entity): { route: string; offset: number } {
    const killable = tank.getTrait('killable') as Killable;

    if (killable.dead) {
      const animation = sprite.animations.get('bang');

      const route = animation ? animation(Math.abs(killable.deadTime)) : '';
      return { route, offset: route.includes('big') ? -8 : 0 };
    }

    const go = tank.getTrait('go') as Go;
    runAnim = sprite.animations.get(`run-${go.side}`);

    const route = runAnim ? runAnim(Math.abs(go.direction)) : '';

    return { route, offset: 0 };
  }

  function drawEnemy(entity: Entity) {
    return function draw(ctx: CanvasRenderingContext2D | null) {
      const { route, offset } = routeFrame(entity);

      sprite.draw(route, ctx, entity.pos.x + offset, entity.pos.y + offset);
    };
  }

  return function createEnemy() {
    const enemy = new Entity();

    enemy.size.set(16, 16);
    enemy.addTrait(new Solid());
    enemy.addTrait(new Physics());
    enemy.addTrait(new Enemy());
    enemy.addTrait(new Go());
    enemy.addTrait(new Behavior());
    enemy.addTrait(new Killable());

    (enemy.getTrait('go') as Go).directionY = 1;
    (enemy.getTrait('go') as Go).side = SIDES.BOTTOM;

    enemy.draw = drawEnemy(enemy);
    // enemy.obstruct = obstructEnemy(enemy);

    return enemy;
  };
}

export { createEnemyFactory };
