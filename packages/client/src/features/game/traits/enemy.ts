import { Traits } from '@/constant/traits';
import { SIDES } from '../constants';
import { Entity } from '../entity';
import { Go } from './go';
import { Trait } from './trait';

class Enemy extends Trait {
  constructor() {
    super(Traits.Enemy);
  }

  obstruct(entity: Entity, side: SIDES): void {
    const go = entity.getTrait(Traits.Go) as Go;
    if (side === SIDES.LEFT || side === SIDES.RIGHT) {
      go.directionX = -go.directionX;
      go.side = side === SIDES.LEFT ? SIDES.RIGHT : SIDES.LEFT;
    } else {
      go.directionY = -go.directionY;
      go.side = side === SIDES.TOP ? SIDES.BOTTOM : SIDES.TOP;
    }
  }
}

export { Enemy };
