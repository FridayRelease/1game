import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { Vec2 } from '../math';
import { GameContext } from '../types';
import { Killable } from './killable';
import { Trait } from './trait';

class EagleController extends Trait {
  checkpoint: Vec2;
  eagle: Entity | null;

  constructor() {
    super(Traits.EagleController);
    this.checkpoint = new Vec2(0, 0);
    this.eagle = null;
  }

  setEagle(entity: Entity) {
    this.eagle = entity;
  }

  update(entity: Entity, gameContext: GameContext, level: Level): void {
    if (this.eagle && !level.entities.has(this.eagle)) {
      const killable = this.eagle.getTrait(Traits.Killable) as Killable;
      killable.revive();
      this.eagle.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.eagle);
    }
  }
}

export { EagleController };
