import { gameApi } from '@/api';
import { ILevelDTO, ISpriteSheetDTO } from '@/api/types';
import { Entities } from '@/constant/entities';
import { Font } from '@/features/game/font';
import { createAnim } from '@/features/game/anim';
import { createBulletFactory } from '@/features/game/enteties/bullet';
import { createEnemyFactory } from '@/features/game/enteties/enemy';
import { createTankFactory } from '@/features/game/enteties/tank';
import { Level } from '@/features/game/level';
import { setupBackgrounds, setupEntities } from '@/features/game/loaders/level';
import { SpriteSheet } from '@/features/game/spritesheet';
import { EntityFactoryCallback } from '@/features/game/types';
import { AudioBoard } from '@/features/game/audio-board';

const fetchSpriteSheet = async (name: string) => {
  const sheetSpec = await gameApi.loadSprites(name);
  const image = await gameApi.loadImage(sheetSpec.imageUrl);

  const sprite = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileW);

  sheetSpec.tiles?.forEach(tileSpec => {
    sprite.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
  });

  sheetSpec.frames?.forEach(frameSpec => {
    sprite.define(frameSpec.name, frameSpec.rect[0], frameSpec.rect[1], frameSpec.rect[2], frameSpec.rect[3]);
  });

  sheetSpec.animations?.forEach(animSpec => {
    const animation = createAnim(animSpec.frames, animSpec.frameLen);
    sprite.defineAnim(animSpec.name, animation);
  });

  return sprite;
};

const fetchEnemy = async (entityFactories: Record<string, EntityFactoryCallback>) => {
  const sheetSpec = await fetchSpriteSheet(Entities.Enemy);

  return createEnemyFactory(sheetSpec, entityFactories);
};

const fetchBullet = async () => {
  const sheetSpec = await fetchSpriteSheet(Entities.Bullet);

  return createBulletFactory(sheetSpec);
};

const fetchTank = async (audioContext: AudioContext, entitiesFactory: Record<string, EntityFactoryCallback>) => {
  const resSheetSpec = fetchSpriteSheet(Entities.Tank);
  const resAudio = fetchAudioBoard(Entities.Tank, audioContext);

  const [sprite, audio] = await Promise.all([resSheetSpec, resAudio]);

  return createTankFactory(sprite, audio, entitiesFactory);
};

const fetchLevel = async (entityFactories: Record<string, EntityFactoryCallback>) => {
  const loadLevel = async (name: string) => {
    const levelSpec = await gameApi.loadLevel(name);

    const backgroundSprites = await fetchSpriteSheet(levelSpec.spriteSheet);

    const level = new Level();

    setupBackgrounds(levelSpec, level, backgroundSprites);
    setupEntities(levelSpec, level, entityFactories);

    return level;
  };

  return loadLevel;
};

const fetchFont = async () => {
  const image = await gameApi.loadImage('/img/fonts.png');

  const fontSprite = new SpriteSheet(image, 8, 8);

  fontSprite.define('0', 0, 0, 8, 8);
  fontSprite.define('1', 8, 0, 8, 8);
  fontSprite.define('2', 16, 0, 8, 8);
  fontSprite.define('3', 24, 0, 8, 8);
  fontSprite.define('4', 32, 0, 8, 8);

  fontSprite.define('5', 0, 8, 8, 8);
  fontSprite.define('6', 8, 8, 8, 8);
  fontSprite.define('7', 16, 8, 8, 8);
  fontSprite.define('8', 24, 8, 8, 8);
  fontSprite.define('9', 32, 8, 8, 8);

  fontSprite.define('i', 0, 16, 8, 8);
  fontSprite.define('p', 8, 16, 8, 8);

  fontSprite.define('&', 16, 16, 8, 8);
  fontSprite.define('*', 24, 16, 8, 8);

  fontSprite.define('@', 32, 16, 16, 16);

  return new Font(fontSprite, 8);
};

const fetchAudio = (audioContext: AudioContext) => {
  return async (name: string) => {
    const arrayBuffer = await gameApi.loadAudio(name);

    return audioContext.decodeAudioData(arrayBuffer);
  };
};

const fetchAudioBoard = async (name: string, audioContext: AudioContext) => {
  const loadAudio = fetchAudio(audioContext);

  const audioSheet = await gameApi.loadAudioSheet(name);
  const audioBoard = new AudioBoard();

  await Promise.all(
    Object.keys(audioSheet).map(name => {
      return loadAudio(audioSheet[name].url).then(buffer => {
        audioBoard.addAudio(name, buffer);
      });
    })
  );

  return audioBoard;
};

export { fetchSpriteSheet, fetchEnemy, fetchTank, fetchLevel, fetchBullet, fetchFont, fetchAudio, fetchAudioBoard };
