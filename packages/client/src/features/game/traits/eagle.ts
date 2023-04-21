import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { GameContext } from '../types';
import { Killable } from './killable';
import { findPlayer } from './player';
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

  update(entity: Entity, _: GameContext, level: Level): void {
    const killable = entity.getTrait(Traits.Killable) as Killable;

    if (killable.dead) {
      const player = findPlayer(level);

      console.warn(player);

      // level.entities.delete(player);
    }
  }
}

export { Eagle };
