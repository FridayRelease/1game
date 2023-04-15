import { Traits } from '@/constant/traits';
import { SIDES } from '../constants';
import { Entity } from '../entity';
import { Killable } from './killable';
import { Trait } from './trait';

class Bullet extends Trait {
  side: SIDES;

  constructor() {
    super(Traits.Bullet);
    this.side = SIDES.TOP;
  }

  obstruct(entity: Entity): void {
    const killable = entity.getTrait(Traits.Killable) as Killable;

    if (killable?.dead) {
      return;
    }

    killable.kill();
  }

  update(entity: Entity): void {
    if (this.side === SIDES.LEFT || this.side === SIDES.RIGHT) {
      entity.vel.x = this.side === SIDES.LEFT ? -100 : 100;
    } else if (this.side === SIDES.TOP || this.side === SIDES.BOTTOM) {
      entity.vel.y = this.side === SIDES.TOP ? -100 : 100;
    }
  }
}

export { Bullet };
