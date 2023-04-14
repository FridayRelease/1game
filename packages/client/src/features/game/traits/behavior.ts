import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Go } from './go';
import { Killable } from './killable';
import { Trait } from './trait';

class Behavior extends Trait {
  constructor() {
    super(Traits.Behavior);
  }

  collides(us: Entity, them: Entity) {
    const usKillable = us.getTrait(Traits.Killable) as Killable;

    if (usKillable.dead) {
      return;
    }

    if (them.getTrait(Traits.Enemy)) {
      if (them.vel.y > us.vel.y) {
        usKillable.kill();
      } else {
        (them.getTrait(Traits.Killable) as Killable).kill();
        (them.getTrait(Traits.Go) as Go).speed = 0;
      }
    }
  }
}

export { Behavior };
