import { Entities } from '@/constant/entities';
import { Traits } from '@/constant/traits';
import { AudioBoard } from '../audio-board';
import { EntityType, ENTITY_POSITION, SIDES } from '../constants';
import { Entity } from '../entity';
import { Level } from '../level';
import { SpriteSheet } from '../spritesheet';
import { Behavior } from '../traits/behavior';
import { Bullet } from '../traits/bullet';
import Emitter from '../traits/emitter';
import { Go } from '../traits/go';
import { Killable } from '../traits/killable';
import { Physics } from '../traits/physics';
import { Shoot } from '../traits/shoot';
import { Solid } from '../traits/solid';
import { EntityFactoryCallback } from '../types';

function createTankFactory(
  sprite: SpriteSheet,
  audio: AudioBoard,
  entityFactories: Record<string, EntityFactoryCallback>
) {
  let runAnim = sprite.animations.get('run-top');

  function directTank(entity: Entity) {
    return function direct(side: SIDES) {
      const go = entity.getTrait(Traits.Go) as Go;
      if (go) {
        go.side = side;
      }
      runAnim = sprite.animations.get(`run-${side}`);
    };
  }

  function routeFrame(entity: Entity) {
    const go = entity.getTrait(Traits.Go) as Go;

    const killable = entity.getTrait(Traits.Killable) as Killable;

    if (killable.dead) {
      const animation = sprite.animations.get('bang');

      const route = animation ? animation(Math.abs(killable.deadTime)) : '';
      return { route, offset: route.includes('big') ? -8 : 0 };
    }

    const route = runAnim ? runAnim(Math.abs(go.direction)) : '';

    return { route, offset: 0 };
  }

  function drawTank(entity: Entity) {
    return function draw(ctx: CanvasRenderingContext2D | null) {
      const { route, offset } = routeFrame(entity);

      sprite.draw(route, ctx, entity.pos.x + offset, entity.pos.y + offset);
    };
  }

  function emitBullet(entity: Entity, level: Level) {
    const createBulletEntity = entityFactories[Entities.Bullet];
    const bullet = createBulletEntity();
    bullet.pos.copy(entity.pos);

    const go = entity.getTrait(Traits.Go) as Go;

    bullet.addTrait(
      new Bullet({
        side: go.side,
        position: ENTITY_POSITION.FRIEND,
      })
    );

    entity.sounds.add('shoot');

    level.entities.add(bullet);
  }

  return function createTank() {
    const tank = new Entity(EntityType.TANK);
    tank.audio = audio;

    tank.offset.set(1, 1);
    tank.size.set(15, 15);
    tank.addTrait(new Solid());
    tank.addTrait(new Physics());
    tank.addTrait(new Go());
    tank.addTrait(new Killable());
    tank.addTrait(new Behavior());

    const emitter = new Shoot();
    emitter.interval = 2;
    emitter.emitters.push(emitBullet);
    tank.addTrait(emitter);

    tank.draw = drawTank(tank);
    tank.direct = directTank(tank);

    return tank;
  };
}

export { createTankFactory };
