import { Entity } from './entity';
import { Level } from './level';
import { Matrix } from './math';
import { SpriteSheet } from './spritesheet';

function createBackgroundLayer(
  level: Level,
  tiles: Matrix,
  sprites: SpriteSheet
) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 256;

  const ctx = buffer.getContext('2d');

  function redraw(startIndex: number, endIndex: number) {
    ctx?.clearRect(0, 0, buffer.width, buffer.height);

    for (let x = startIndex; x <= endIndex; ++x) {
      const col = tiles.grid[x];
      if (col) {
        col.forEach((tile, y) => {
          if (sprites.animations.has(tile.name ?? '')) {
            sprites.drawAnim(
              tile.name ?? '',
              ctx,
              x - startIndex,
              y,
              level.totalTime
            );
          } else {
            sprites.drawTile(tile.name || '', ctx, x - startIndex, y);
          }
        });
      }
    }
  }

  return function drawBackgroundLayer(ctx: CanvasRenderingContext2D | null) {
    redraw(0, 256);

    ctx?.drawImage(buffer, 0, 0);
  };
}

function createSpriteLayer(entities: Set<Entity>) {
  return function (ctx: CanvasRenderingContext2D | null) {
    entities.forEach(entity => {
      entity.draw(ctx);
    });
  };
}

function createCollisionLayer(level: Level) {
  const resolvedTiles: { x: number; y: number }[] = [];

  const tileResolver = level.tileCollider?.tiles;
  const tileSize = tileResolver?.tileSize;

  const getByIndexOriginal = tileResolver?.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawCollision(ctx: CanvasRenderingContext2D | null) {
    ctx.strokeStyle = 'blue';

    resolvedTiles.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.rect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.stroke();
    });

    ctx.strokeStyle = 'red';
    level.entities.forEach(entity => {
      ctx.beginPath();
      ctx.rect(
        entity.bounds.left,
        entity.bounds.top,
        entity.size.x,
        entity.size.y
      );
      ctx.stroke();
    });

    resolvedTiles.length = 0;
  };
}

export { createBackgroundLayer, createSpriteLayer, createCollisionLayer };
