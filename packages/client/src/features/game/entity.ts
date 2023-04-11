import { BoundingBox } from './bounding-box';
import { SIDES } from './constants';
import { Level } from './level';
import { Vec2 } from './math';
import { Trait } from './traits/trait';

interface IEntity {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  update: (deltaTime: number, level: Level) => void;
  obstruct: (side: SIDES) => void;
  direct: (side: SIDES) => void;
  draw: (ctx: CanvasRenderingContext2D | null) => void;
}

class Entity implements IEntity {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  offset: Vec2;
  traits: Trait[];
  bounds: BoundingBox;

  constructor() {
    this.vel = new Vec2(0, 0);
    this.pos = new Vec2(0, 0);
    this.size = new Vec2(8, 8);
    this.offset = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.traits = [];
  }

  addTrait(trait: Trait) {
    this.traits.push(trait);
  }

  collides(canditate: Entity) {
    this.traits.forEach(trait => {
      trait.collides(this, canditate);
    });
  }

  obstruct(side: SIDES) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side);
    });
  }

  direct(side: SIDES) {
    this.traits.forEach(trait => {
      trait.direct(this, side);
    });
  }

  update(deltaTime: number, level: Level) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime, level);
    });
  }

  getTrait(name: string): Trait | undefined {
    return this.traits.find(e => e.NAME === name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  draw(ctx: CanvasRenderingContext2D | null) {}
}

export { Entity };
