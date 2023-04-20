import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { Vec2 } from '../math';
import { GameContext } from '../types';
import { Go } from './go';
import { Killable } from './killable';
import { Trait } from './trait';

class Player extends Trait {
  lives: number;
  score: number;

  constructor() {
    super(Traits.PlayerController);
    this.score = 0;
    this.lives = 3;
  }
}

function createPlayer(entity: Entity) {
  entity.addTrait(new Player());

  return entity;
}

function* findPlayer(level: Level) {
  for (const entity of level.entities) {
    if (entity.getTrait(Traits.Player)) {
      yield entity;
    }
  }
}

export { Player, createPlayer, findPlayer };
