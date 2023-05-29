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
  enemiesCount: number;
  totalEnemies: number;
  name!: string;

  constructor() {
    super(Traits.Player);
    this.score = 0;
    this.lives = 3;
    this.enemiesCount = 0;
    this.totalEnemies = 0;

    this.events.on(Killable.EVENT_KILL, (entity: Entity) => {
      if (entity.type === EntityType.TANK) {
        this.lives -= 1;
      } else if (entity.type === EntityType.ENEMY_TANK) {
        this.score += 100;
        this.enemiesCount += 1;
      }
    });
  }

  update(entity: Entity, gameContext: GameContext, level: Level): void {
    if (this.lives <= 0) {
      level.events.emit(Level.EVENT_TRIGGER, 'gameOver');
    }
  }
}

const getPlayerTrait = (entities: Set<Entity>): Player | undefined => {
  for (const entity of findPlayer(entities)) {
    return entity.traits.get(Traits.Player) as Player;
  }

  return undefined;
};

const createPlayer = (entity: Entity) => {
  entity.addTrait(new Player());

  return entity;
};

function* findPlayer(entities: Set<Entity>) {
  for (const entity of entities) {
    if (entity.traits.has(Traits.Player)) {
      yield entity;
    }
  }
}

export { Player, createPlayer, findPlayer, getPlayerTrait };
