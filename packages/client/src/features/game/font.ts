import { SpriteSheet } from './spritesheet';

class Font {
  size: number;
  sprites: SpriteSheet;

  constructor(sprites: SpriteSheet, size: number) {
    this.sprites = sprites;
    this.size = size;
  }

  print(text: string, ctx: CanvasRenderingContext2D, x: number, y: number) {
    [...text].forEach((char, pos) => {
      this.sprites.draw(char, ctx, x + pos * this.size, y);
    });
  }
}

export { Font };
