import { SIDES } from './constants';
import { Entity } from './entity';
import { Matrix } from './math';
import { TileResolver } from './tile-resolver';

class TileCollider {
  tiles: TileResolver;

  constructor(tileMatrix: Matrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkX(entity: Entity) {
    let x: number;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(x, x, entity.bounds.top, entity.bounds.bottom);

    matches.forEach(match => {
      if (!match) {
        return;
      }

      if (match.tile.type !== 'wall') {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.bounds.right = match.x1;
          entity.vel.x = 0;
          entity.obstruct(SIDES.RIGHT);
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.bounds.left = match.x2;
          entity.vel.x = 0;
          entity.obstruct(SIDES.LEFT);
        }
      }
    });
  }

  checkY(entity: Entity) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(entity.bounds.left, entity.bounds.right, y, y);

    matches.forEach(match => {
      if (!match) {
        return;
      }

      if (match.tile.type !== 'wall') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.bounds.bottom = match.y1;
          entity.vel.y = 0;

          entity.obstruct(SIDES.BOTTOM);
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.bounds.top = match.y2;
          entity.vel.y = 0;

          entity.obstruct(SIDES.TOP);
        }
      }
    });
  }

  test(entity: Entity) {
    const matches = this.tiles.searchByRange(
      entity.pos.x,
      entity.pos.x + entity.size.x,
      entity.pos.y,
      entity.pos.y + entity.size.y
    );

    matches.forEach(match => {
      if (!match) {
        return;
      }

      if (match.tile.type !== 'wall') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > match.y1) {
          entity.pos.y = match.y1 - entity.size.y;
          entity.vel.y = 0;
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < match.y2) {
          entity.pos.y = match.y2;
          entity.vel.y = 0;
        }
      }
    });
  }
}

export { TileCollider };
