import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { Trait } from './trait';
import { GameContext, EmmitCallBackFunction } from '../types';

export default class Emitter extends Trait {
  interval: number;
  coolDown: number;
  emitters: EmmitCallBackFunction[];

  constructor() {
    super(Traits.Emitter);
    this.interval = 2;
    this.coolDown = this.interval;
    this.emitters = [];
  }

  emit(entity: Entity, level: Level) {
    for (const emitter of this.emitters) {
      emitter(entity, level);
    }
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    this.coolDown -= deltaTime;
    if (this.coolDown <= 0) {
      this.emit(entity, level);
      this.coolDown = this.interval;
    }
  }
}
