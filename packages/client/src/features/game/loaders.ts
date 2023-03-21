import { createAnim } from './anim';
import { SpriteSheet } from './spritesheet';
import { ISpriteSheet } from './types';

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadJson<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json());
}

function loadSpriteSheet(name: string): Promise<SpriteSheet> {
  return loadJson<ISpriteSheet>(`/sprites/${name}.json`)
    .then(sheetSpec => Promise.all([sheetSpec, loadImage(sheetSpec.imageUrl)]))
    .then(([sheetSpec, image]) => {
      const sprite = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileW);

      if (sheetSpec.tiles) {
        sheetSpec.tiles.forEach(tileSpec => {
          sprite.defineTile(
            tileSpec.name,
            tileSpec.index[0],
            tileSpec.index[1]
          );
        });
      }

      if (sheetSpec.frames) {
        sheetSpec.frames.forEach(frameSpec => {
          sprite.define(
            frameSpec.name,
            frameSpec.rect[0],
            frameSpec.rect[1],
            frameSpec.rect[2],
            frameSpec.rect[3]
          );
        });
      }

      if (sheetSpec.animations) {
        sheetSpec.animations.forEach(animSpec => {
          const animation = createAnim(animSpec.frames, animSpec.frameLen);
          sprite.defineAnim(animSpec.name, animation);
        });
      }

      return sprite;
    });
}

function loadTankSprite() {
  return loadImage('img/tiles.png').then((image: HTMLImageElement) => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile('idle', 0, 0);
    return sprites;
  });
}

export { loadJson, loadImage, loadTankSprite, loadSpriteSheet };
