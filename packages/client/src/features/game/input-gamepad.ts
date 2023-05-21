import { Entity } from '@/features/game/entity'
import { GamepadState } from '@/features/game/gamepad-state'
import { moveBottom, moveLeft, moveRight, moveTop, playerShoot } from '@/features/game/move'

function setupGamepad(entity: Entity) {
  const input = new GamepadState();

  input.addMapping('0', () => {
    playerShoot(entity)
  });

  input.addMapping('15', (keyState) => {
    moveRight(entity, keyState)
  })
  input.addMapping('12', (keyState) => {
    moveTop(entity, keyState)
  })

  input.addMapping('14', (keyState) => {
    moveLeft(entity, keyState)
  })
  input.addMapping('13', (keyState) => {
    moveBottom(entity, keyState)
  })

  return input;
}

export { setupGamepad }
