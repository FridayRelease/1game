import { SIDES } from '../constants';
import { Entity } from '../entity';
import EventBus from '../event-bus';
import { Level } from '../level';

import { CallBackFunction, GameContext, MatchTile, TraitName } from '../types';

interface ITrait {
  NAME: TraitName;
  update(entity: Entity, gameContext: GameContext, level: Level): void;

  obstruct(entity: Entity, side: SIDES, match: MatchTile): void;

  direct(entity: Entity, side: SIDES): void;

  collides(entity: Entity, canditate: Entity): void;
}

class Trait implements ITrait {
  NAME: TraitName;
  tasks: CallBackFunction[];
  events: typeof EventBus;

  constructor(name: TraitName) {
    this.NAME = name;
    this.tasks = [];
    this.events = EventBus;
  }

  finalize() {
    this.tasks.forEach(task => {
      task();
    });

    this.tasks.length = 0;
  }

  queue(task: CallBackFunction) {
    this.tasks.push(task);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  update(entity: Entity, gameContext: GameContext, level: Level) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  obstruct(entity: Entity, side: SIDES, match: MatchTile) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  direct(entity: Entity, side: SIDES) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  collides(entity: Entity, canditate: Entity) {}
}

export { Trait };
