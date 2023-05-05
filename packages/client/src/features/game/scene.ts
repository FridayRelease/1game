import { Compositor } from './compositor';
import { GameContext } from './types';
import { EventBus } from './event-bus';

class Scene {
  static EVENT_COMPLETE = 'scene complete';

  comp: Compositor;
  events: EventBus;

  constructor() {
    this.comp = new Compositor();
    this.events = new EventBus();
  }
  draw(gameContext: GameContext) {
    this.comp.draw(gameContext.videoContext);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  pause() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  update(gameContext: GameContext) {}
}

export { Scene };
