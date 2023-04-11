import { SIDES } from '../constants';
import { Entity } from '../entity';
import { MatchTile } from '../types';
import { Trait } from './trait';

class Solid extends Trait {
  constructor() {
    super('solid');
  }

  obstruct(entity: Entity, side: SIDES, match: MatchTile): void {
    if (side === SIDES.BOTTOM) {
      entity.bounds.bottom = match.y1;
      entity.vel.y = 0;
    } else if (side === SIDES.TOP) {
      entity.bounds.top = match.y2;
      entity.vel.y = 0;
    } else if ((side = SIDES.RIGHT)) {
      entity.bounds.right = match.x1;
      entity.vel.x = 0;
    } else if (side === SIDES.LEFT) {
      entity.bounds.left = match.x2;
      entity.vel.x = 0;
    }
  }
}

export { Solid };
