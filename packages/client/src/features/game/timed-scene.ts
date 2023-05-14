import { Scene } from './scene';
import { GameContext } from './types';

export default class TimedScene extends Scene {
  countDown: number;

  constructor() {
    super();
    this.countDown = 2;
  }

  update(gameContext: GameContext) {
    this.countDown -= gameContext.deltaTime;
    if (this.countDown <= 0) {
      this.events.emit(Scene.EVENT_COMPLETE);
    }
  }
}

export { Scene };
