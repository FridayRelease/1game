import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { GameContext } from '../types';
import { Player, findPlayer } from './player';
import { Trait } from './trait';

const getPlayerTrait = (entities: Set<Entity>): Player | undefined => {
  for (const entity of findPlayer(entities)) {
    return entity.traits.get(Traits.Player) as Player;
  }

  return undefined;
};

export default class LevelTimer extends Trait {
  static EVENT_TIMER_HURRY = 'timer hurry';
  static EVENT_TIMER_OK = 'timer ok';

  totalTime: number;
  currentTime: number;
  hurryTime: number;
  hurryEmitted: null | boolean;
  addedTime: number;
  totalEnemy: number;

  constructor() {
    super(Traits.LevelTimer);
    this.totalTime = 300;
    this.currentTime = this.totalTime;
    this.hurryTime = 100;
    this.hurryEmitted = null;
    this.addedTime = this.totalTime;
    this.totalEnemy = 4;
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    this.currentTime -= deltaTime * 2;
    if (this.hurryEmitted !== true && this.currentTime < this.hurryTime) {
      level.events.emit(LevelTimer.EVENT_TIMER_HURRY);
      this.hurryEmitted = true;
    }
    if (this.hurryEmitted !== false && this.currentTime > this.hurryTime) {
      level.events.emit(LevelTimer.EVENT_TIMER_OK);
      this.hurryEmitted = false;
    }

    if (this.currentTime < this.addedTime) {
      const enemies = Array.from(level.entities).filter(e => e.hasTrait(Traits.Enemy));
      const player = getPlayerTrait(level.entities);
      const count = player?.enemiesCount || 0 - enemies.length;
      if (enemies?.length < this.totalEnemy && count > 0) {
        level.events.emit(Level.EVENT_TRIGGER, 'entity');
      }
      this.addedTime = this.addedTime - 10;
    }
  }
}
