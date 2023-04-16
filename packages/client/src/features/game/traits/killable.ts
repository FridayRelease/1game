import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { GameContext } from '../types';
import { Trait } from './trait';

class Killable extends Trait {
  dead: boolean;
  deadTime: number;
  removeAfter: number;

  constructor() {
    super(Traits.Killable);
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 1.2;
  }

  kill() {
    this.queue(() => {
      this.dead = true;
    });
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level): void {
    if (this.dead) {
      entity.vel.set(0, 0);

      this.deadTime += deltaTime;
      if (this.deadTime > this.removeAfter) {
        this.queue(() => {
          level.entities.delete(entity);
        });
      }
    }
  }
}

export { Killable };
