import { SIDES } from '../constants';
import { Entity } from '../entity';
import { Level } from '../level';
import { CallBackFunction, MatchTile } from '../types';

class Trait {
  NAME: string;
  tasks: CallBackFunction[];

  constructor(name: string) {
    this.NAME = name;
    this.tasks = [];
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
  update(entity: Entity, deltaTime: number, level: Level) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  obstruct(entity: Entity, side: SIDES, match: MatchTile) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  direct(entity: Entity, side: SIDES) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  collides(entity: Entity, canditate: Entity) {}
}

export { Trait };
