interface ITimer {
  updateProxy: (time: number) => void;
}

class Timer implements ITimer {
  updateProxy: (time: number) => void;
  private id!: number;

  constructor(deltaTime = 1 / 60) {
    let accumulatedTime = 0;
    let lastTime = 0;

    this.updateProxy = (time: number) => {
      accumulatedTime += (time - lastTime) / 1000;
      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }

      lastTime = time;

      this.enqueue();
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  update(deltaTime: number) {}

  enqueue() {
    if (this.id) {
      this.cancel();
    }
    this.id = requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }

  cancel() {
    if (this.id) {
      cancelAnimationFrame(this.id);
    }
  }
}

export { Timer };
