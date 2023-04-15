import { Traits } from '@/constant/traits';
import { SIDES } from '../constants';
import { Entity } from '../entity';
import { SpriteSheet } from '../spritesheet';
import { Enemy } from '../traits/enemy';
import { Go } from '../traits/go';
import { Killable } from '../traits/killable';
import { Physics } from '../traits/physics';
import { Solid } from '../traits/solid';
import { Trait } from '../traits/trait';

class Behavior extends Trait {
  constructor() {
    super(Traits.Behavior);
  }

  collides(us: Entity, them: Entity) {
    const usKillable = us.getTrait(Traits.Killable) as Killable;
    const themKillable = them.getTrait(Traits.Killable) as Killable;

    if (usKillable.dead || themKillable.dead) {
      return;
    }

    if (them.getTrait(Traits.Bullet)) {
      themKillable.kill();

      usKillable.kill();
      (us.getTrait(Traits.Go) as Go).speed = 0;
    }
  }
}

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

    enemy.size.set(16, 16);
    enemy.addTrait(new Solid());
    enemy.addTrait(new Physics());
    enemy.addTrait(new Enemy());
    enemy.addTrait(new Go());
    enemy.addTrait(new Behavior());
    enemy.addTrait(new Killable());

    (enemy.getTrait(Traits.Go) as Go).directionY = 1;
    (enemy.getTrait(Traits.Go) as Go).side = SIDES.BOTTOM;

    enemy.draw = drawEnemy(enemy);

    return enemy;
  };
}

export { createEnemyFactory };
