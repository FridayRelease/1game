import { Entities } from '@/constant/entities';
import { Traits } from '@/constant/traits';
import { EntityType, ENTITY_POSITION, SIDES } from '../constants';
import { Entity } from '../entity';
import { Level } from '../level';
import { SpriteSheet } from '../spritesheet';
import { Bullet } from '../traits/bullet';
import Emitter from '../traits/emitter';
import { Enemy } from '../traits/enemy';
import { EnemyBehavior } from '../traits/enemy-behavior';
import { Go } from '../traits/go';
import { Killable } from '../traits/killable';
import { Physics } from '../traits/physics';
import { findPlayer, Player } from '../traits/player';
import { Solid } from '../traits/solid';
import { EntityFactoryCallback } from '../types';

const getPlayerTrait = (entities: Set<Entity>): Player | undefined => {
  for (const entity of findPlayer(entities)) {
    return entity.traits.get(Traits.Player) as Player;
  }

  return undefined;
};

function createEnemyFactory(sprite: SpriteSheet, entityFactories: Record<string, EntityFactoryCallback>) {
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

  function emitBullet(enemy: Entity, level: Level) {
    const killable = enemy.getTrait(Traits.Killable) as Killable;
    if (killable.dead) {
      return;
    }
    const createBulletEntity = entityFactories[Entities.Bullet];
    const bullet = createBulletEntity();
    bullet.pos.copy(enemy.pos);

    const go = enemy.getTrait(Traits.Go) as Go;

    bullet.addTrait(
      new Bullet({
        side: go.side,
        position: ENTITY_POSITION.VILLAIN,
      })
    );

    level.entities.add(bullet);
  }

  function drawEnemy(entity: Entity) {
    return function draw(ctx: CanvasRenderingContext2D | null) {
      const { route, offset } = routeFrame(entity);

      sprite.draw(route, ctx, entity.pos.x + offset, entity.pos.y + offset);
    };
  }

  function callbackAfterKilled(level: Level) {
    const enemiesCount = getPlayerTrait(level.entities)?.enemiesCount || 0;
    const totalEnemies = getPlayerTrait(level.entities)?.totalEnemies || 0;

    if (enemiesCount === totalEnemies) {
      level.events.emit(Level.EVENT_TRIGGER, 'goto');
    }
  }

  return function createEnemy() {
    const enemy = new Entity(EntityType.ENEMY_TANK);

    enemy.size.set(16, 16);
    enemy.addTrait(new Solid());
    enemy.addTrait(new Physics());
    enemy.addTrait(new Enemy());
    enemy.addTrait(new Go());
    enemy.addTrait(new EnemyBehavior());
    enemy.addTrait(new Killable());

    (enemy.getTrait(Traits.Go) as Go).directionY = 1;
    (enemy.getTrait(Traits.Go) as Go).side = SIDES.BOTTOM;

    (enemy.getTrait(Traits.Killable) as Killable).callbackAfterKilled = callbackAfterKilled;

    const emitter = new Emitter();
    emitter.emitters.push(emitBullet);
    enemy.addTrait(emitter);

    enemy.draw = drawEnemy(enemy);

    return enemy;
  };
}

export { createEnemyFactory };
