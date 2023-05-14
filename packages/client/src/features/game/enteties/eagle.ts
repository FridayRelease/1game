import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Level } from '../level';
import { SpriteSheet } from '../spritesheet';
import { Eagle } from '../traits/eagle';
import { Killable } from '../traits/killable';
import { Physics } from '../traits/physics';
import { Solid } from '../traits/solid';

function createEagleFactory(sprite: SpriteSheet) {
  function drawEagle(entity: Entity) {
    return function draw(ctx: CanvasRenderingContext2D | null) {
      const killable = entity.getTrait(Traits.Killable) as Killable;

      sprite.draw(killable.dead ? 'stone' : 'eagle', ctx, entity.pos.x, entity.pos.y);
    };
  }

  return function createEagle() {
    const eagle = new Entity();

    eagle.offset.set(1, 1);
    eagle.size.set(15, 15);
    eagle.addTrait(new Solid());
    eagle.addTrait(new Physics());
    eagle.addTrait(new Eagle());
    eagle.addTrait(new Killable());

    (eagle.getTrait(Traits.Killable) as Killable).isRemoveAfter = false;
    (eagle.getTrait(Traits.Killable) as Killable).callbackAfterKilled = level => {
      level.events.emit(Level.EVENT_TRIGGER, 'gameOver');
    };

    eagle.draw = drawEagle(eagle);

    return eagle;
  };
}

export { createEagleFactory };
