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
          this.smoothByY(SIDES.RIGHT, entity);

          entity.obstruct(SIDES.RIGHT, match);
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          this.smoothByY(SIDES.LEFT, entity);

          entity.obstruct(SIDES.LEFT, match);
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
          this.smoothByY(SIDES.BOTTOM, entity);

          entity.obstruct(SIDES.BOTTOM, match);
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          this.smoothByY(SIDES.TOP, entity);

          entity.obstruct(SIDES.TOP, match);
        }
      }
    });
  }

  // Поворачивая влево или вправо танк упёрся в стену. Помогаем повернуть.
  smoothByX(side: SIDES, entity: Entity) {
    let matrixColumn = Math.floor(entity.bounds.right / this.tiles.tileSize);
    if (side === SIDES.LEFT) {
      matrixColumn = Math.max(Math.floor(entity.bounds.left / this.tiles.tileSize - 1), 0);
    }

    const matrixColumnIndexTop = Math.floor(entity.bounds.top / this.tiles.tileSize);
    const matrixColumnIndexBottom = Math.floor(entity.bounds.bottom / this.tiles.tileSize);

    // Нижняя часть модели танка задевает стену.
    if (
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexTop].type === 'background' &&
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom] &&
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom].type === 'wall'
    ) {
      if (matrixColumnIndexBottom - matrixColumnIndexTop > 1) {
        // В этом месте для верхней части танка свободный тайл.
        // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
        if (this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom - 1].type === 'background') {
          entity.pos.y = Math.floor(entity.pos.y / this.tiles.tileSize) * this.tiles.tileSize;
        }
      }
    }

    // Верхняя часть модели танка задевает стену.
    else if (
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexTop] &&
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexTop].type === 'wall' &&
      this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom].type === 'background'
    ) {
      if (matrixColumnIndexBottom - matrixColumnIndexTop > 1) {
        // В этом месте для нижней части танка свободный тайл.
        // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
        if (this.tiles.matrix.grid[matrixColumn][matrixColumnIndexBottom - 1].type === 'background') {
          entity.pos.y = Math.floor(entity.pos.y / this.tiles.tileSize) * this.tiles.tileSize + this.tiles.tileSize;
        }
      }
    }
  }

  // Поворачивая вверх или вниз танк упёрся в стену. Помогаем повернуть.
  smoothByY(side: SIDES, entity: Entity) {
    let matrixRow = Math.max(Math.floor(entity.bounds.top / this.tiles.tileSize - 1), 0);
    if (side === SIDES.BOTTOM) {
      matrixRow = Math.floor(entity.bounds.bottom / this.tiles.tileSize);
    }

    const matrixColumnIndexLeft = Math.floor(entity.bounds.left / this.tiles.tileSize);
    const matrixColumnIndexRight = Math.floor(entity.bounds.right / this.tiles.tileSize);

    // Правая часть модели танка упёрлась стену.
    if (
      this.tiles.matrix.grid[matrixColumnIndexLeft][matrixRow].type === 'background' &&
      this.tiles.matrix.grid[matrixColumnIndexRight][matrixRow] &&
      this.tiles.matrix.grid[matrixColumnIndexRight][matrixRow].type === 'wall'
    ) {
      if (matrixColumnIndexRight - matrixColumnIndexLeft > 1) {
        // В этом месте для левой части танка свободный тайл.
        // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
        if (this.tiles.matrix.grid[matrixColumnIndexRight - 1][matrixRow].type === 'background') {
          entity.pos.x = Math.floor(entity.pos.x / this.tiles.tileSize) * this.tiles.tileSize;
        }
      }
    }

    // Левая часть модели танка упёрлась стену.
    else if (
      this.tiles.matrix.grid[matrixColumnIndexLeft][matrixRow] &&
      this.tiles.matrix.grid[matrixColumnIndexLeft][matrixRow].type === 'wall' &&
      this.tiles.matrix.grid[matrixColumnIndexRight][matrixRow].type === undefined
    ) {
      if (matrixColumnIndexRight - matrixColumnIndexLeft > 1) {
        // В этом месте для правой части танка свободный тайл.
        // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
        if (this.tiles.matrix.grid[matrixColumnIndexRight - 1][matrixRow].type === 'background') {
          entity.pos.x = Math.floor(entity.pos.x / this.tiles.tileSize) * this.tiles.tileSize + this.tiles.tileSize;
        }
      }
    }
  }
}

export { TileCollider };
