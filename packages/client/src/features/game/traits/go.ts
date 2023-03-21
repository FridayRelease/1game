import { SIDES } from '../constants';
import { Entity } from '../entity';
import { Trait } from './trait';

class Go extends Trait {
  side: SIDES;
  directionX: number;
  directionY: number;
  deceleration: number;
  speed: number;

  constructor() {
    super('go');
    this.side = SIDES.TOP;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 2000;
    this.deceleration = 100;
  }

  get direction() {
    if (this.side === SIDES.LEFT || this.side === SIDES.RIGHT) {
      return this.directionX;
    }
    return this.directionY;
  }

  update(entity: Entity, deltaTime: number) {
    if (this.side === SIDES.LEFT || this.side === SIDES.RIGHT) {
      const absX = Math.abs(entity.vel.x);
      entity.vel.y = 0;
      this.directionY = 0;

      if (this.directionX !== 0) {
        entity.vel.x = this.speed * this.directionX * deltaTime;
      } else if (entity.vel.x !== 0) {
        const decel = Math.min(absX, this.deceleration * deltaTime);
        entity.vel.x += entity.vel.x > 0 ? -decel : decel;
      }
    } else if (this.side === SIDES.BOTTOM || this.side === SIDES.TOP) {
      const absY = Math.abs(entity.vel.y);
      this.directionX = 0;
      entity.vel.x = 0;

      if (this.directionY !== 0) {
        entity.vel.y = this.speed * this.directionY * deltaTime;
      } else if (entity.vel.y !== 0) {
        const decel = Math.min(absY, this.deceleration * deltaTime);
        entity.vel.y += entity.vel.y > 0 ? -decel : decel;
      }
    } else {
      this.directionX = 0;
      this.directionY = 0;
    }
  }
}

export { Go };
