import { SIDES } from '../constants';
import { Entity } from '../entity';
import { loadSpriteSheet } from '../loaders';
import { SpriteSheet } from '../spritesheet';
import { Go } from '../traits/go';

function loadEnemy(): Promise<() => Entity> {
  return loadSpriteSheet('enemy').then(createEnemyFactory);
}

function createEnemyFactory(sprite: SpriteSheet) {
  const runAnim = sprite.animations.get('run-up');

  function routeFrame(tank: Entity) {
    const go = tank.getTrait('go') as Go;

    return runAnim ? runAnim(go.speed) : 'run-top-1';
  }

  return function createEnemy() {
    const enemy = new Entity();

    enemy.size.set(16, 16);
    enemy.addTrait(new Go());
    (enemy.getTrait('go') as Go).directionY = 1;

    enemy.draw = function draw(ctx: CanvasRenderingContext2D | null) {
      sprite.draw(routeFrame(this), ctx, this.pos.x, this.pos.y);
    };
    return enemy;
  };
}

export { loadEnemy };
