import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Killable } from './killable';
import { Trait } from './trait';

class Eagle extends Trait {
  constructor() {
    super(Traits.Eagle);
  }

  collides(us: Entity, them: Entity) {
    if (us.type !== them.type) {
      const themKillable = them.getTrait(Traits.Killable) as Killable;
      const usKillable = us.getTrait(Traits.Killable) as Killable;

      if (themKillable.dead || usKillable.dead) {
        return;
      }

      themKillable.kill();

      usKillable.kill();
    }
  }
}

export { Eagle };
