import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { GameContext } from '../types';
import { Trait } from './trait';

class Physics extends Trait {
  constructor() {
    super(Traits.Physics);
  }

  update(entity: Entity, gameContext: GameContext, level: Level): void {
    entity.pos.x += entity.vel.x * gameContext.deltaTime;
    level.tileCollider?.checkX(entity, gameContext, level);

    entity.pos.y += entity.vel.y * gameContext.deltaTime;
    level.tileCollider?.checkY(entity, gameContext, level);
  }
}

export { Physics };
