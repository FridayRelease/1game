import { Traits } from '@/constant/traits';
import { ENTITY_POSITION, SIDES } from '../constants';
import { Entity } from '../entity';
import { Killable } from './killable';
import { Trait } from './trait';

class Bullet extends Trait {
  side: SIDES;
  position: ENTITY_POSITION;

  constructor({ position, side } = { position: ENTITY_POSITION.NONE, side: SIDES.TOP }) {
    super(Traits.Bullet);
    this.side = side;
    this.position = position;
  }

  collides(us: Entity, them: Entity) {
    if (us.type === them.type) {
      const usKillable = us.getTrait(Traits.Killable) as Killable;
      const themKillable = them.getTrait(Traits.Killable) as Killable;

      if (usKillable.dead || themKillable.dead) {
        return;
      }

      themKillable.kill();

      usKillable.kill();
    }
  }

  obstruct(entity: Entity): void {
    const killable = entity.getTrait(Traits.Killable) as Killable;

    if (killable?.dead) {
      return;
    }

    killable.kill();
  }

  update(entity: Entity): void {
    const killable = entity.getTrait(Traits.Killable) as Killable;

    if (killable.dead) {
      return;
    }

    if (this.side === SIDES.LEFT || this.side === SIDES.RIGHT) {
      entity.vel.x = this.side === SIDES.LEFT ? -100 : 100;
    } else if (this.side === SIDES.TOP || this.side === SIDES.BOTTOM) {
      entity.vel.y = this.side === SIDES.TOP ? -100 : 100;
    }
  }
}

export { Bullet };
