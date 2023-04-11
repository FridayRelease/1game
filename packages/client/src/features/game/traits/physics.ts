import { Entity } from '../entity';
import { Level } from '../level';
import { Trait } from './trait';

class Physics extends Trait {
  constructor() {
    super('physics');
  }

  update(entity: Entity, deltaTime: number, level: Level): void {
    entity.pos.x += entity.vel.x * deltaTime;
    level.tileCollider?.checkX(entity);

    entity.pos.y += entity.vel.y * deltaTime;
    level.tileCollider?.checkY(entity);
  }
}

export { Physics };
