import { SIDES } from '../constants';
import { Entity } from '../entity';

class Trait {
  NAME: string;
  constructor(name: string) {
    this.NAME = name;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(entity: Entity, deltaTime: number) {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  obstruct(entity: Entity, side: SIDES) {
    throw new Error('Method not implemented.');
  }
}

export { Trait };
