import { Entity } from '../entity';
import { Level } from '../level';
import { Trait } from './trait';

class Killable extends Trait {
  dead: boolean;
  deadTime: number;
  removeAfter: number;

  constructor() {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 1.2;
  }

  kill() {
    this.dead = true;
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(entity: Entity, deltaTime: number, level: Level): void {
    if (this.dead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeAfter) {
        level.entities.delete(entity);
      }
    }
  }
}

export { Killable };
