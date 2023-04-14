import { Level } from '../level';
import { IExpandedTile, EntityFactoryCallback } from '../types';
import { Matrix } from '../math';
import { SpriteSheet } from '../spritesheet';
import { ITileDTO, ILevelDTO, IPatternDTO } from '@/api/types';
import { createBackgroundLayer, createSpriteLayer } from '../layers/index';

function setupCollision(levelSpec: ILevelDTO, level: Level) {
  const mergedTiles = levelSpec.layers.reduce<Array<ITileDTO>>((mergedTiles, layerSpec) => {
    return mergedTiles.concat(layerSpec.tiles);
  }, []);
  const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
  level.setCollisionGrid(collisionGrid);
}

function setupBackgrounds(levelSpec: ILevelDTO, level: Level, backgroundSprites: SpriteSheet) {
  levelSpec.layers.forEach(layer => {
    const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
    const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
    level.comp.push(backgroundLayer);
  });
}

function setupEntities(levelSpec: ILevelDTO, level: Level, entityFactory: Record<string, EntityFactoryCallback>) {
  levelSpec.entities.forEach(({ name, pos: [x, y] }) => {
    const createEntity = entityFactory[name];
    const entity = createEntity();
    entity.pos.set(x, y);
    level.entities.add(entity);
  });

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.push(spriteLayer);
}

function createCollisionGrid(tiles: Array<ITileDTO>, patterns: IPatternDTO) {
  const grid = new Matrix();

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, tile);
  }

  return grid;
}

function createBackgroundGrid(tiles: Array<ITileDTO>, patterns: IPatternDTO) {
  const grid = new Matrix();

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, tile);
  }

  return grid;
}

function* expandSpan(xStart: number, xLen: number, yStart: number, yLen: number) {
  const xEnd = xStart + xLen;
  const yEnd = yStart + yLen;

  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      yield { x, y };
    }
  }
}

function expandRange(range: Array<number>) {
  if (range.length === 4) {
    const [xStart, xEnd, yStart, yEnd] = range;
    return expandSpan(xStart, xEnd, yStart, yEnd);
  } else if (range.length === 3) {
    const [xStart, xEnd, yStart] = range;
    return expandSpan(xStart, xEnd, yStart, 1);
  } else if (range.length === 2) {
    const [xStart, yStart] = range;
    return expandSpan(xStart, 1, yStart, 1);
  }
  throw new SyntaxError('Ups, range is empty');
}

function* expandRanges(ranges: Array<Array<number>>) {
  for (const range of ranges) {
    yield* expandRange(range);
  }
}

function* expandTiles(tiles: Array<ITileDTO>, patterns: IPatternDTO) {
  function* walkTiles(tiles: Array<ITileDTO>, offsetX: number, offsetY: number): Generator<IExpandedTile> {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;

        if (tile.pattern) {
          const tiles = patterns[tile.pattern].tiles;
          yield* walkTiles(tiles, derivedX, derivedY);
        } else {
          yield {
            tile,
            x: derivedX,
            y: derivedY,
          };
        }
      }
    }
  }

  yield* walkTiles(tiles, 0, 0);
}

export { setupCollision, setupBackgrounds, setupEntities };
