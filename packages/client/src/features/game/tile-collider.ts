import { SIDES } from './constants';
import { Entity } from './entity';
import { Level } from './level';
import { Matrix } from './math';
import { TileResolver } from './tile-resolver';
import { background } from './tiles/background';
import { brick } from './tiles/brick';
import { wall } from './tiles/wall';
import { GameContext, HandlerFunction, MatchTile } from './types';

const handlers: Record<string, HandlerFunction[]> = { brick, background, wall };
class TileCollider {
  resolvers: TileResolver[];

  constructor() {
    this.resolvers = [];
  }

  addGrid(tileMatrix: Matrix) {
    this.resolvers.push(new TileResolver(tileMatrix));
  }

  checkX(entity: Entity, gameContext: GameContext, level: Level) {
    let x: number;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(x, x, entity.bounds.top, entity.bounds.bottom);

      matches.forEach(match => {
        this.handlers(0, entity, match, resolver, gameContext, level);
      });
    }
  }

  checkY(entity: Entity, gameContext: GameContext, level: Level) {
    let y: number;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }
    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(entity.bounds.left, entity.bounds.right, y, y);

      matches.forEach(match => {
        this.handlers(1, entity, match, resolver, gameContext, level);
      });
    }
  }

  handlers(
    index: number,
    entity: Entity,
    match: MatchTile,
    resolver: TileResolver,
    gameContext: GameContext,
    level: Level
  ) {
    const tileContext = {
      entity,
      match,
      resolver,
      gameContext,
      level,
    };
    const handler = handlers[match.tile.type];

    if (handler) {
      handler[index](tileContext);
    }
  }

  // Поворачивая влево или вправо танк упёрся в стену. Помогаем повернуть.
  smoothByX(side: SIDES, entity: Entity) {
    for (const resolver of this.resolvers) {
      let matrixColumn = Math.floor(entity.bounds.right / resolver.tileSize);

      if (side === SIDES.LEFT) {
        matrixColumn = Math.max(Math.floor(entity.bounds.left / resolver.tileSize - 1), 0);
      }

      const matrixColumnIndexTop = Math.floor(entity.bounds.top / resolver.tileSize);
      const matrixColumnIndexBottom = Math.floor(entity.bounds.bottom / resolver.tileSize);

      // Нижняя часть модели танка задевает стену.
      if (
        resolver.matrix.grid[matrixColumn][matrixColumnIndexTop].type === 'background' &&
        resolver.matrix.grid[matrixColumn][matrixColumnIndexBottom] &&
        resolver.matrix.grid[matrixColumn][matrixColumnIndexBottom].type === 'wall'
      ) {
        if (matrixColumnIndexBottom - matrixColumnIndexTop > 1) {
          // В этом месте для верхней части танка свободный тайл.
          // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
          if (resolver.matrix.grid[matrixColumn][matrixColumnIndexBottom - 1].type === 'background') {
            entity.pos.y = Math.floor(entity.pos.y / resolver.tileSize) * resolver.tileSize;
          }
        }
      }

      // Верхняя часть модели танка задевает стену.
      else if (
        resolver.matrix.grid[matrixColumn][matrixColumnIndexTop] &&
        resolver.matrix.grid[matrixColumn][matrixColumnIndexTop].type === 'wall' &&
        resolver.matrix.grid[matrixColumn][matrixColumnIndexBottom].type === 'background'
      ) {
        if (matrixColumnIndexBottom - matrixColumnIndexTop > 1) {
          // В этом месте для нижней части танка свободный тайл.
          // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
          if (resolver.matrix.grid[matrixColumn][matrixColumnIndexBottom - 1].type === 'background') {
            entity.pos.y = Math.floor(entity.pos.y / resolver.tileSize) * resolver.tileSize + resolver.tileSize;
          }
        }
      }
    }
  }

  // Поворачивая вверх или вниз танк упёрся в стену. Помогаем повернуть.
  smoothByY(side: SIDES, entity: Entity) {
    for (const resolver of this.resolvers) {
      let matrixRow = Math.max(Math.floor(entity.bounds.top / resolver.tileSize - 1), 0);
      if (side === SIDES.BOTTOM) {
        matrixRow = Math.floor(entity.bounds.bottom / resolver.tileSize);
      }

      const matrixColumnIndexLeft = Math.floor(entity.bounds.left / resolver.tileSize);
      const matrixColumnIndexRight = Math.floor(entity.bounds.right / resolver.tileSize);

      // Правая часть модели танка упёрлась стену.
      if (
        resolver.matrix.grid[matrixColumnIndexLeft][matrixRow].type === 'background' &&
        resolver.matrix.grid[matrixColumnIndexRight][matrixRow] &&
        resolver.matrix.grid[matrixColumnIndexRight][matrixRow].type === 'wall'
      ) {
        if (matrixColumnIndexRight - matrixColumnIndexLeft > 1) {
          // В этом месте для левой части танка свободный тайл.
          // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
          if (resolver.matrix.grid[matrixColumnIndexRight - 1][matrixRow].type === 'background') {
            entity.pos.x = Math.floor(entity.pos.x / resolver.tileSize) * resolver.tileSize;
          }
        }
      }

      // Левая часть модели танка упёрлась стену.
      else if (
        resolver.matrix.grid[matrixColumnIndexLeft][matrixRow] &&
        resolver.matrix.grid[matrixColumnIndexLeft][matrixRow].type === 'wall' &&
        resolver.matrix.grid[matrixColumnIndexRight][matrixRow].type === undefined
      ) {
        if (matrixColumnIndexRight - matrixColumnIndexLeft > 1) {
          // В этом месте для правой части танка свободный тайл.
          // Средняя чать танка занимает целиком один тайл, если он пустой, то переносим танк в проезд.
          if (resolver.matrix.grid[matrixColumnIndexRight - 1][matrixRow].type === 'background') {
            entity.pos.x = Math.floor(entity.pos.x / resolver.tileSize) * resolver.tileSize + resolver.tileSize;
          }
        }
      }
    }
  }
}

export { TileCollider };
