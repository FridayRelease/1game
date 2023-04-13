import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { Vec2 } from '../math';
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

  update(entity: Entity, deltaTime: number, level: Level): void {
    if (this.player && !level.entities.has(this.player)) {
      const killable = this.player.getTrait(Traits.Killable) as Killable;
      killable.revive();
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    }
  }
}

export { PlayerController };
