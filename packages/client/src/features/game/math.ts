import { ITileDTO } from '@/api/types';

class Matrix {
  grid: Array<ITileDTO[]>;

  constructor() {
    this.grid = [];
  }

  forEach(callback: (tile: { type?: string; name?: string }, x: number, y: number) => void) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }

  delete(x: number, y: number) {
    const col = this.grid[x];
    if (col) {
      delete col[y];
    }
  }

  get(x: number, y: number) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }
    return undefined;
  }

  set(x: number, y: number, value: ITileDTO) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }
}

class Vec2 {
  x!: number;
  y!: number;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  copy(vec2: Vec2) {
    this.x = vec2.x;
    this.y = vec2.y;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export { Vec2, Matrix };
