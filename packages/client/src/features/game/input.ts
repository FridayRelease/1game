import { SIDES } from './constants';
import { Entity } from './entity';
import { KeyboardState } from './keyboard-state';
import { Level } from './level';
import { Bullet } from './traits/bullet';
import { Go } from './traits/go';
import { EntityFactoryCallback } from './types';

function setupKeyboard(entity: Entity, level: Level, entityFactory: Record<string, EntityFactoryCallback>) {
  const input = new KeyboardState();

  input.addMapping('KeyZ', () => {
    const createBulletEntity = entityFactory['bullet'];
    const bullet = createBulletEntity();

    bullet.pos.set(entity.pos.x, entity.bounds.top);
    const go = entity.getTrait('go') as Go;

    (bullet.getTrait('bullet') as Bullet).side = go.side;

    level.entities.add(bullet);
  });

  input.addMapping('ArrowRight', keyState => {
    entity.direct(SIDES.RIGHT);
    const go = entity.getTrait('go') as Go;
    if (go) {
      go.directionY = 0;
      go.directionX = keyState ? 1 : 0;
    }
    console.warn('ArrowRight', go.directionX, go.directionX);
  });

  input.addMapping('ArrowLeft', keyState => {
    entity.direct(SIDES.LEFT);
    const go = entity.getTrait('go') as Go;
    if (go) {
      go.directionY = 0;
      go.directionX = keyState ? -1 : 0;
    }
    console.warn('ArrowLeft', go.directionX, go.directionX);
  });

  input.addMapping('ArrowDown', keyState => {
    entity.direct(SIDES.BOTTOM);
    const go = entity.getTrait('go') as Go;
    if (go) {
      go.directionX = 0;
      go.directionY = keyState ? 1 : 0;
    }
    console.warn('ArrowDown', go.directionX, go.directionX);
  });

  input.addMapping('ArrowUp', keyState => {
    entity.direct(SIDES.TOP);

    const go = entity.getTrait('go') as Go;
    if (go) {
      go.directionX = 0;
      go.directionY = keyState ? -1 : 0;
    }
  });

  return input;
}

export { setupKeyboard };
