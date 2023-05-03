import { Scene } from './scene';
import { GameContext } from './types';

class SceneRunner {
  sceneIndex: number;
  scenes: Scene[];

  constructor() {
    this.sceneIndex = -1;
    this.scenes = [];
  }

  addScene(scene: Scene) {
    scene.events.on(Scene.EVENT_COMPLETE, () => {
      this.next();
    });
    this.scenes.push(scene);
  }

  next() {
    const currentScene = this.scenes[this.sceneIndex];

    if (currentScene) {
      currentScene.pause();
    }

    this.sceneIndex++;
  }

  update(gameContext: GameContext) {
    const currentScene = this.scenes[this.sceneIndex];

    if (currentScene) {
      currentScene.update(gameContext);
      currentScene.draw(gameContext);
    }
  }
}

export { SceneRunner };
