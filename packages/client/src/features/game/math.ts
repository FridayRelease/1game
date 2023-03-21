class Matrix {
  grid: Array<{ name?: string; type?: string }[]>;

  constructor() {
    this.grid = [];
  }

  forEach(
    callback: (
      tile: { type?: string; name?: string },
      x: number,
      y: number
    ) => void
  ) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }

  get(x: number, y: number) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }
    return undefined;
  }

  set(x: number, y: number, value: { name?: string; type?: string }) {
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

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export { Vec2, Matrix };
