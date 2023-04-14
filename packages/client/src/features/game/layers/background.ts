import { Level } from '../level';
import { Matrix } from '../math';
import { SpriteSheet } from '../spritesheet';

function createBackgroundLayer(level: Level, tiles: Matrix, sprites: SpriteSheet) {
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
            sprites.drawAnim(tile.name ?? '', ctx, x - startIndex, y, level.totalTime);
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

export { createBackgroundLayer };
