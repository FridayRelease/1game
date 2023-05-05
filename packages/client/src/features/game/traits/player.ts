import { Traits } from '@/constant/traits';
import { EntityType } from '../constants';
import { Entity } from '../entity';
import { Level } from '../level';
import { GameContext } from '../types';
import { Killable } from './killable';
import { Trait } from './trait';

class Player extends Trait {
  lives: number;
  score: number;
  enemiesCount!: number;

  constructor() {
    super(Traits.Player);
    this.score = 0;
    this.lives = 3;

    this.events.on(Killable.EVENT_KILL, (entity: Entity) => {
      if (entity.type === EntityType.TANK) {
        this.lives -= 1;
      } else if (entity.type === EntityType.ENEMY_TANK) {
        this.score += 100;
        this.enemiesCount -= 1;
      }
      console.warn(this);
    });
  }

  update(entity: Entity, gameContext: GameContext, level: Level): void {
    if (this.lives <= 0) {
      level.events.emit(Level.EVENT_TRIGGER, 'gameOver');
    }
  }
}

function createPlayer(entity: Entity) {
  entity.addTrait(new Player());

  return entity;
}

function* findPlayer(entities: Set<Entity>) {
  for (const entity of entities) {
    if (entity.traits.has(Traits.Player)) {
      yield entity;
    }
  }
}

export { Player, createPlayer, findPlayer };
