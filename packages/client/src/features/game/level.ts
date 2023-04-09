import { Compositor } from './compositor';
import { Entity } from './entity';
import { Matrix } from './math';
import { TileCollider } from './tile-collider';
import { EntityCollider } from './entity-collider';

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

  update(deltaTime: number) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider?.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider?.checkY(entity);

      this.entityCollider?.check(entity);
    });
  }
}

export { Level };
