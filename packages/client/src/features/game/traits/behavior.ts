import { Entity } from '../entity';
import { Go } from './go';
import { Killable } from './killable';
import { Trait } from './trait';

class Behavior extends Trait {
  constructor() {
    super('behavior');
  }

  collides(us: Entity, them: Entity) {
    const usKillable = us.getTrait('killable') as Killable;

    if (usKillable.dead) {
      return;
    }

    if (them.getTrait('enemy')) {
      if (them.vel.y > us.vel.y) {
        usKillable.kill();
      } else {
        (them.getTrait('killable') as Killable).kill();
        (them.getTrait('go') as Go).speed = 0;
      }
    }
  }
}

export { Behavior };
