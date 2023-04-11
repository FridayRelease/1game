import { SIDES } from '../constants';
import { Entity } from '../entity';
import { Level } from '../level';

class Trait {
  NAME: string;
  constructor(name: string) {
    this.NAME = name;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  update(entity: Entity, deltaTime: number, level: Level) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  obstruct(entity: Entity, side: SIDES) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  direct(entity: Entity, side: SIDES) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  collides(entity: Entity, canditate: Entity) {}
}

export { Trait };
