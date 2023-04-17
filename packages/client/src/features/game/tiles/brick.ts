import { Traits } from '@/constant/traits';
import { SIDES } from '../constants';
import { HandlerFunction, HandlerProps } from '../types';

function handleX({ entity, resolver, match }: HandlerProps) {
  if (entity.vel.x > 0) {
    if (entity.bounds.right > match.x1) {
      if (entity.getTrait(Traits.Bullet)) {
        const grid = resolver.matrix;
        grid.delete(match.indexX, match.indexY);
      }
      entity.obstruct(SIDES.RIGHT, match);
    }
  } else if (entity.vel.x < 0) {
    if (entity.bounds.left < match.x2) {
      if (entity.getTrait(Traits.Bullet)) {
        const grid = resolver.matrix;
        grid.delete(match.indexX, match.indexY);
      }
      entity.obstruct(SIDES.LEFT, match);
    }
  }
}

function handleY({ entity, match, resolver }: HandlerProps) {
  if (entity.vel.y > 0) {
    if (entity.bounds.bottom > match.y1) {
      if (entity.getTrait(Traits.Bullet)) {
        const grid = resolver.matrix;
        grid.delete(match.indexX, match.indexY);
      }
      entity.obstruct(SIDES.BOTTOM, match);
    }
  } else if (entity.vel.y < 0) {
    if (entity.bounds.top < match.y2) {
      if (entity.getTrait(Traits.Bullet)) {
        const grid = resolver.matrix;
        grid.delete(match.indexX, match.indexY);
      }
      entity.obstruct(SIDES.TOP, match);
    }
  }
}
export const brick: HandlerFunction[] = [handleX, handleY];
