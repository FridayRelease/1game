import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { Vec2 } from '../math';
import { GameContext } from '../types';
import { Go } from './go';
import { Killable } from './killable';
import { Trait } from './trait';

class PlayerController extends Trait {
  checkpoint: Vec2;
  player: Entity | null;

  constructor() {
    super(Traits.PlayerController);
    this.checkpoint = new Vec2(0, 0);
    this.player = null;
  }

  setPlayer(entity: Entity) {
    this.player = entity;
  }

  update(entity: Entity, _: GameContext, level: Level): void {
    if (this.player && !level.entities.has(this.player)) {
      const killable = this.player.getTrait(Traits.Killable) as Killable;
      const go = this.player.getTrait(Traits.Go) as Go;
      go.speed = 2000;
      killable.revive();
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    }
  }
}

export { PlayerController };
