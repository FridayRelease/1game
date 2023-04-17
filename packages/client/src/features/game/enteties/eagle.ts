import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { SpriteSheet } from '../spritesheet';
import { Killable } from '../traits/killable';
import { Physics } from '../traits/physics';
import { Solid } from '../traits/solid';

function createEagleFactory(sprite: SpriteSheet) {
  function drawEagle(entity: Entity) {
    return function draw(ctx: CanvasRenderingContext2D | null) {
      sprite.draw('eagle', ctx, entity.pos.x, entity.pos.y);
    };
  }

  return function createEagle() {
    const eagle = new Entity();

    eagle.offset.set(1, 1);
    eagle.size.set(15, 15);
    eagle.addTrait(new Solid());
    eagle.addTrait(new Physics());
    eagle.addTrait(new Killable());

    (eagle.getTrait(Traits.Killable) as Killable).removeAfter = 0;

    eagle.draw = drawEagle(eagle);

    return eagle;
  };
}

export { createEagleFactory };
