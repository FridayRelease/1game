import { AudioBoard } from './audio-board';
import { BoundingBox } from './bounding-box';
import { EntityType, SIDES } from './constants';
import { Level } from './level';
import { Vec2 } from './math';
import { Trait } from './traits/trait';
import { GameContext, MatchTile } from './types';

type IEntity = {
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  update: (gameContext: GameContext, level: Level) => void;
  obstruct: (side: SIDES, match: MatchTile) => void;
  direct: (side: SIDES) => void;
  draw: (ctx: CanvasRenderingContext2D | null) => void;
};

class Entity implements IEntity {
  type: EntityType;
  pos: Vec2;
  vel: Vec2;
  size: Vec2;
  offset: Vec2;
  traits: Trait[];
  bounds: BoundingBox;
  lifeTime: number;
  audio: AudioBoard;

  constructor() {
    this.audio = new AudioBoard();
    this.type = EntityType.NONE;
    this.vel = new Vec2(0, 0);
    this.pos = new Vec2(0, 0);
    this.size = new Vec2(8, 8);
    this.offset = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.traits = [];

    this.lifeTime = 0;
  }

  finalize() {
    this.traits.forEach(trait => {
      trait.finalize();
    });
  }

  addTrait(trait: Trait) {
    this.traits.push(trait);
  }

  collides(canditate: Entity) {
    this.traits.forEach(trait => {
      trait.collides(this, canditate);
    });
  }

  obstruct(side: SIDES, match: MatchTile) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side, match);
    });
  }

  direct(side: SIDES) {
    this.traits.forEach(trait => {
      trait.direct(this, side);
    });
  }

  update(gameContext: GameContext, level: Level) {
    this.traits.forEach(trait => {
      trait.update(this, gameContext, level);
      trait.playSounds(this.audio, gameContext.audioContext);
    });
    this.lifeTime += gameContext.deltaTime;
  }

  getTrait(name: string): Trait | undefined {
    return this.traits.find(e => e.NAME === name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  draw(ctx: CanvasRenderingContext2D | null) {}
}

export { Entity };
