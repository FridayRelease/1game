import { Compositor } from './compositor';
import { Entity } from './entity';
import { Matrix } from './math';
import { TileCollider } from './tile-collider';
import { EntityCollider } from './entity-collider';
import { GameContext } from './types';

class Level {
  comp: Compositor;
  entities: Set<Entity>;
  tiles: Matrix;
  tileCollider: TileCollider | null;
  totalTime: number;
  entityCollider: EntityCollider;

  constructor() {
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();
    this.tileCollider = null;
    this.entityCollider = new EntityCollider(this.entities);
    this.totalTime = 0;
  }

  setCollisionGrid(matrix: Matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(gameContext: GameContext) {
    this.entities.forEach(entity => {
      entity.update(gameContext, this);
    });

    this.entities.forEach(entity => {
      this.entityCollider?.check(entity);
    });

    this.entities.forEach(entity => {
      entity.finalize();
    });
  }
}

export { Level };
