class SpriteSheet {
  image: HTMLImageElement;
  width: number;
  height: number;
  tiles: Map<string, HTMLCanvasElement>;
  animations: Map<string, (distance: number) => string>;

  constructor(image: HTMLImageElement, width: number, height: number) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.animations = new Map();
  }

  defineAnim(name: string, animation: (distance: number) => string) {
    this.animations.set(name, animation);
  }

  define(name: string, x: number, y: number, width: number, height: number) {
    const buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;

    const ctx = buffer.getContext('2d');

    ctx?.drawImage(this.image, x, y, width, height, 0, 0, width, height);

    this.tiles.set(name, buffer);
  }

  defineTile(name: string, x: number, y: number) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(
    name: string,
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number
  ) {
    const buffer = this.tiles.get(name);

    if (buffer) {
      ctx?.drawImage(buffer, x, y);
    }
  }

  drawAnim(
    name: string,
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    distance: number
  ) {
    const animation = this.animations.get(name);
    if (animation) {
      this.drawTile(animation(distance), ctx, x, y);
    }
  }

  drawTile(
    name: string,
    ctx: CanvasRenderingContext2D | null,
    x: number,
    y: number
  ) {
    this.draw(name, ctx, x * this.width, y * this.width);
  }
}

export { SpriteSheet };
