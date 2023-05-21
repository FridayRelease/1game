import { Entity } from './entity';
import { KeyboardState } from './keyboard-state';
import { moveBottom, moveLeft, moveRight, moveTop, playerShoot } from '@/features/game/move'

function setupKeyboard(entity: Entity) {
  const input = new KeyboardState();

  input.addMapping('KeyZ', () => {
    playerShoot(entity)
  });

  input.addMapping('ArrowRight', keyState => {
    moveRight(entity, keyState)
  });

  input.addMapping('ArrowLeft', keyState => {
    moveLeft(entity, keyState)
  });

  input.addMapping('ArrowDown', keyState => {
    moveBottom(entity, keyState)
  });

  input.addMapping('ArrowUp', keyState => {
    moveTop(entity, keyState)
  });

  return input;
}

export { setupKeyboard };
