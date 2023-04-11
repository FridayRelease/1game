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
          this.fixByX(SIDES.RIGHT, entity);
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.bounds.left = match.x2;
          entity.vel.x = 0;
          entity.obstruct(SIDES.LEFT);
          this.fixByX(SIDES.LEFT, entity);
        }
      }
    });
  }

  checkY(entity: Entity) {
    let y: number;
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
          this.fixByY(SIDES.BOTTOM, entity);
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.bounds.top = match.y2;
          entity.vel.y = 0;

          entity.obstruct(SIDES.TOP);
          this.fixByY(SIDES.TOP, entity);
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

  // Поворачивая влево или вправо танк упёрся в стену. Помогаем повернуть.
  fixByX(side: SIDES, entity: Entity) {
    let matrixColumn = entity.bounds.right / this.tiles.tileSize;
    if (side === SIDES.LEFT) {
      matrixColumn = entity.bounds.left / this.tiles.tileSize - 1;
    }

    const matrixColumnIndexTop = Math.floor(entity.bounds.top / this.tiles.tileSize);
    const matrixColumnIndexBottom = Math.floor(entity.bounds.bottom / this.tiles.tileSize);

    // Нижняя часть модели танка задевает стену.
    if (
      !this.tiles.matrix.grid[matrixColumn][matrixColumnIndexTop] &&
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom] &&
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom].type === 'wall'
    ) {
      if (matrixColumnIndexBottom - matrixColumnIndexTop > 1) {
        // В этом месте для верхней части танка свободный тайл.
        // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
        if (!this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom - 1]) {
          entity.pos.y = Math.floor(entity.pos.y / this.tiles.tileSize) * this.tiles.tileSize;
        }
      }
    }

    // Верхняя часть модели танка задевает стену.
    else if (
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexTop] &&
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexTop].type === 'wall' &&
      !this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom]
    ) {
      if (matrixColumnIndexBottom - matrixColumnIndexTop > 1) {
        // В этом месте для нижней части танка свободный тайл.
        // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
        if (!this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom - 1]) {
          entity.pos.y = Math.floor(entity.pos.y / this.tiles.tileSize) * this.tiles.tileSize + this.tiles.tileSize;
        }
      }
    }
  }

  // Поворачивая вверх или вниз танк упёрся в стену. Помогаем повернуть.
  fixByY(side: SIDES, entity: Entity) {
    let matrixRow = entity.bounds.top / this.tiles.tileSize - 1;
    if (side === SIDES.BOTTOM) {
      matrixRow = entity.bounds.bottom / this.tiles.tileSize;
    }

    const matrixColumnIndexLeft = Math.floor(entity.bounds.left / this.tiles.tileSize);
    const matrixColumnIndexRight = Math.floor(entity.bounds.right / this.tiles.tileSize);

    // Правая часть модели танка упёрлась стену.
    if (
      !this.tiles.matrix.grid[matrixColumnIndexLeft][matrixRow] &&
      this.tiles.matrix.grid[matrixColumnIndexRight][matrixRow] &&
      this.tiles.matrix.grid[matrixColumnIndexRight][matrixRow].type === 'wall'
    ) {
      if (matrixColumnIndexRight - matrixColumnIndexLeft > 1) {
        // В этом месте для левой части танка свободный тайл.
        // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
        if (!this.tiles.matrix.grid[matrixColumnIndexRight - 1][matrixRow]) {
          entity.pos.x = Math.floor(entity.pos.x / this.tiles.tileSize) * this.tiles.tileSize;
        }
      }
    }

    // Левая часть модели танка упёрлась стену.
    else if (
      this.tiles.matrix.grid[matrixColumnIndexLeft][matrixRow] &&
      this.tiles.matrix.grid[matrixColumnIndexLeft][matrixRow].type === 'wall' &&
      !this.tiles.matrix.grid[matrixColumnIndexRight][matrixRow]
    ) {
      if (matrixColumnIndexRight - matrixColumnIndexLeft > 1) {
        // В этом месте для правой части танка свободный тайл.
        // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
        if (!this.tiles.matrix.grid[matrixColumnIndexRight - 1][matrixRow]) {
          entity.pos.x = Math.floor(entity.pos.x / this.tiles.tileSize) * this.tiles.tileSize + this.tiles.tileSize;
        }
      }
    }
  }
}

export { TileCollider };
