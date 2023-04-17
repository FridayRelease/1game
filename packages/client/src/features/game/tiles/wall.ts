import { SIDES } from '../constants';
import { HandlerFunction, HandlerProps } from '../types';

function handleX({ entity, match }: HandlerProps) {
  if (entity.vel.x > 0) {
    if (entity.bounds.right > match.x1) {
      entity.obstruct(SIDES.RIGHT, match);
    }
  } else if (entity.vel.x < 0) {
    if (entity.bounds.left < match.x2) {
      entity.obstruct(SIDES.LEFT, match);
    }
  }
}

function handleY({ entity, match }: HandlerProps) {
  if (entity.vel.y > 0) {
    if (entity.bounds.bottom > match.y1) {
      entity.obstruct(SIDES.BOTTOM, match);
    }
  } else if (entity.vel.y < 0) {
    if (entity.bounds.top < match.y2) {
      entity.obstruct(SIDES.TOP, match);
    }
  }
}
export const wall: HandlerFunction[] = [handleX, handleY];
