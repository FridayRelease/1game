import { gameApi } from '@/api';
import { ILevelDTO, ISpriteSheetDTO } from '@/api/types';
import { Entities } from '@/constant/entities';
import { createAnim } from '@/features/game/anim';
import { createBulletFactory } from '@/features/game/enteties/bullet';
import { createEnemyFactory } from '@/features/game/enteties/enemy';
import { createTankFactory } from '@/features/game/enteties/tank';
import { Level } from '@/features/game/level';
import { setupCollision, setupBackgrounds, setupEntities } from '@/features/game/loaders/level';
import { SpriteSheet } from '@/features/game/spritesheet';
import { EntityFactoryCallback } from '@/features/game/types';

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

const fetchEnemy = async () => {
  const sheetSpec = await fetchSpriteSheet(Entities.Enemy);

  return createEnemyFactory(sheetSpec);
};

const fetchBullet = async () => {
  const sheetSpec = await fetchSpriteSheet(Entities.Bullet);

  return createBulletFactory(sheetSpec);
};

const fetchTank = async () => {
  const sheetSpec = await fetchSpriteSheet(Entities.Tank);

  return createTankFactory(sheetSpec);
};

const fetchLevel = async (entityFactory: Record<string, EntityFactoryCallback>) => {
  const loadLevel = async (name: string) => {
    const levelSpec = await gameApi.loadLevel(name);

    const backgroundSprites = await fetchSpriteSheet(levelSpec.spriteSheet);

    const level = new Level();

    setupCollision(levelSpec, level);
    setupBackgrounds(levelSpec, level, backgroundSprites);
    setupEntities(levelSpec, level, entityFactory);

    return level;
  };

  return loadLevel;
};

export { fetchSpriteSheet, fetchEnemy, fetchTank, fetchLevel, fetchBullet };
