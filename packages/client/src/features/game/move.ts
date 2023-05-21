import { Traits } from '@/constant/traits'
import { Go } from '@/features/game/traits/go'
import { Entity } from '@/features/game/entity'
import Shoot from '@/features/game/traits/shoot'
import { SIDES } from '@/features/game/constants'

function playerShoot(entity: Entity) {
  const shoot = entity.getTrait(Traits.Shoot) as Shoot;
  shoot.shoot();
}

function moveTop(entity: Entity, keyState: number) {
  entity.direct(SIDES.TOP);
  const go = entity.getTrait(Traits.Go) as Go;
  if (go) {
    go.directionX = 0;
    go.directionY = keyState ? -1 : 0;
  }
}

function moveBottom(entity: Entity, keyState: number) {
  entity.direct(SIDES.BOTTOM);
  const go = entity.getTrait(Traits.Go) as Go;
  if (go) {
    go.directionX = 0;
    go.directionY = keyState ? 1 : 0;
  }
  console.warn('ArrowDown', go.directionX, go.directionX);
}

function moveLeft(entity: Entity, keyState: number) {
  entity.direct(SIDES.LEFT);
  const go = entity.getTrait(Traits.Go) as Go;
  if (go) {
    go.directionY = 0;
    go.directionX = keyState ? -1 : 0;
  }
  console.warn('ArrowLeft', go.directionX, go.directionX);
}

function moveRight(entity: Entity, keyState: number) {
  entity.direct(SIDES.RIGHT);
  const go = entity.getTrait(Traits.Go) as Go;
  if (go) {
    go.directionY = 0;
    go.directionX = keyState ? 1 : 0;
  }
  console.warn('ArrowRight', go.directionX, go.directionX);
}

export {
  playerShoot,
  moveTop,
  moveBottom,
  moveLeft,
  moveRight
}
