import { Traits } from '@/constant/traits';
import { EntityType } from '../constants';
import { Entity } from '../entity';
import { SpriteSheet } from '../spritesheet';
import { Bullet } from '../traits/bullet';
import { Killable } from '../traits/killable';
import { Physics } from '../traits/physics';
import { Solid } from '../traits/solid';

function createBulletFactory(sprite: SpriteSheet) {
  function routeFrame(entity: Entity): { route: string; offset: number } {
    const killable = entity.getTrait(Traits.Killable) as Killable;

    if (killable.dead) {
      const animation = sprite.animations.get('bang');

      const route = animation ? animation(Math.abs(killable.deadTime)) : '';
      return { route, offset: route.includes('big') ? -8 : 0 };
    }

    const bullet = entity.getTrait(Traits.Bullet) as Bullet;

    return { route: `run-${bullet.side}`, offset: 4 };
  }

  function drawBullet(entity: Entity) {
    return function draw(ctx: CanvasRenderingContext2D | null) {
      const { route, offset } = routeFrame(entity);

      sprite.draw(route, ctx, entity.pos.x + offset, entity.pos.y + offset);
    };
  }

  return function createBullet() {
    const bullet = new Entity(EntityType.BULLET);

    bullet.size.set(8, 8);
    bullet.offset.set(4, 4);
    bullet.addTrait(new Solid());
    bullet.addTrait(new Physics());
    bullet.addTrait(new Killable());

    bullet.draw = drawBullet(bullet);

    return bullet;
  };
}

export { createBulletFactory };
