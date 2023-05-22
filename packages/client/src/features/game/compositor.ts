import { Layer } from './types';

class Compositor {
  private layers: Array<Layer>;

  constructor() {
    this.layers = [];
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    this.layers.forEach(layer => {
      layer(ctx);
    });
  }

  push(layer: Layer) {
    this.layers.push(layer);
  }
}

export { Compositor };
