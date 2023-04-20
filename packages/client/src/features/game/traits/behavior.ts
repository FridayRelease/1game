import { Traits } from '@/constant/traits';
import { EntityType, ENTITY_POSITION } from '../constants';
import { Entity } from '../entity';
import { Bullet } from './bullet';
import { Go } from './go';
import { Killable } from './killable';
import { Trait } from './trait';

class Behavior extends Trait {
  constructor() {
    super(Traits.Behavior);
  }

  collides(us: Entity, them: Entity) {
    if (us.type !== them.type) {
      const usPosition =
        us.type === EntityType.TANK ? ENTITY_POSITION.FRIEND : (us.getTrait(Traits.Bullet) as Bullet)?.position;

      const themPosition =
        them.type === EntityType.TANK ? ENTITY_POSITION.FRIEND : (them.getTrait(Traits.Bullet) as Bullet)?.position;

      if (usPosition === themPosition) {
        return;
      }
    }

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

export { Behavior };
