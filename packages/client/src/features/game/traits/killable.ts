import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { GameContext } from '../types';
import { Trait } from './trait';

class Killable extends Trait {
  static EVENT_KILL = 'kill';

  dead: boolean;
  deadTime: number;
  removeAfter: number;
  callbackAfterKilled!: (level: Level) => void;
  isRemoveAfter: boolean;

  constructor() {
    super(Traits.Killable);
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 1.2;
    this.isRemoveAfter = true;
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
      if (this.isRemoveAfter && this.deadTime > this.removeAfter) {
        this.queue(() => {
          level.entities.delete(entity);
        });
      }

      if (this.callbackAfterKilled) {
        this.callbackAfterKilled(level);
      }
    }
  }
}

export { Killable };
