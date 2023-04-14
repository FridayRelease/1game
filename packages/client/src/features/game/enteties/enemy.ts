import { Traits } from '@/constant/traits';
import { EntityType, POSITION, SIDES } from '../constants';
import { Entity } from '../entity';
import { SpriteSheet } from '../spritesheet';
import { Behavior } from '../traits/behavior';
import { Enemy } from '../traits/enemy';
import { Go } from '../traits/go';
import { Killable } from '../traits/killable';
import { Physics } from '../traits/physics';
import { Shoot } from '../traits/shoot';
import { Solid } from '../traits/solid';

function createEnemyFactory(sprite: SpriteSheet) {
  let runAnim = sprite.animations.get('run-bottom');

  function routeFrame(entity: Entity): { route: string; offset: number } {
    const killable = entity.getTrait(Traits.Killable) as Killable;

    if (killable.dead) {
      const animation = sprite.animations.get('bang');

      const route = animation ? animation(Math.abs(killable.deadTime)) : '';
      return { route, offset: route.includes('big') ? -8 : 0 };
    }

    const go = entity.getTrait(Traits.Go) as Go;
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

    enemy.type = EntityType.TANK;
    enemy.size.set(16, 16);
    enemy.addTrait(new Solid());
    enemy.addTrait(new Physics());
    enemy.addTrait(new Enemy());
    enemy.addTrait(new Go());
    enemy.addTrait(new Behavior());
    enemy.addTrait(new Killable());
    enemy.addTrait(new Shoot());

    (enemy.getTrait(Traits.Go) as Go).directionY = 1;
    (enemy.getTrait(Traits.Go) as Go).side = SIDES.BOTTOM;
    (enemy.getTrait(Traits.Shoot) as Shoot).position = POSITION.VILLAIN;

    enemy.draw = drawEnemy(enemy);

    return enemy;
  };
}

export { createEnemyFactory };
