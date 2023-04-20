import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { Trait } from './trait';
import { GameContext, EmmitCallBackFunction } from '../types';

export default class Shoot extends Trait {
  interval: number;
  coolDown: number;
  emitters: EmmitCallBackFunction[];
  isCreatedBullet: boolean;

  constructor() {
    super(Traits.Shoot);
    this.interval = 1.2;
    this.isCreatedBullet = false;
    this.coolDown = this.interval;
    this.emitters = [];
  }

  emit(entity: Entity, level: Level) {
    for (const emitter of this.emitters) {
      emitter(entity, level);
    }
  }

  shoot() {
    if (this.coolDown <= 0) {
      this.isCreatedBullet = true;
    }
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    this.coolDown -= deltaTime;

    if (this.isCreatedBullet) {
      this.emit(entity, level);
      this.isCreatedBullet = false;
      this.coolDown = this.interval;
    }
  }
}

export { Shoot };
