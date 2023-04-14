import { Entities } from '@/constant/entities';
import { Traits } from '@/constant/traits';
import { POSITION } from '../constants';
import { Entity } from '../entity';
import { Level } from '../level';
import { GameContext } from '../types';
import { Bullet } from './bullet';
import { Go } from './go';
import { Killable } from './killable';
import { Trait } from './trait';

class Shoot extends Trait {
  isShot: boolean;
  time: number;
  shootAfter: number;
  isCreateBullet: boolean;
  position: POSITION;

  constructor() {
    super(Traits.Shoot);
    this.isShot = false;
    this.time = 0;
    this.shootAfter = 1.2;
    this.isCreateBullet = false;
    this.position = POSITION.NONE;
  }

  shoot() {
    this.queue(() => {
      this.isShot = true;
    });
  }

  retry() {
    this.isShot = false;
    this.time = 0;
    this.isCreateBullet = false;
  }

  update(entity: Entity, { deltaTime, entityFactory }: GameContext, level: Level): void {
    if (this.isShot) {
      this.time += deltaTime;

      if (!this.isCreateBullet && !(entity.getTrait(Traits.Killable) as Killable)?.dead) {
        const createBulletEntity = entityFactory[Entities.Bullet];
        const bullet = createBulletEntity();

        bullet.pos.set(entity.pos.x, entity.bounds.top);
        const go = entity.getTrait(Traits.Go) as Go;

        (bullet.getTrait(Traits.Bullet) as Bullet).side = go.side;
        (bullet.getTrait(Traits.Bullet) as Bullet).position = this.position;

        level.entities.add(bullet);
        this.isCreateBullet = true;
        if (this.position === POSITION.FRIEND) {
          this.sounds.add('shoot');
        }
      }

      if (this.time > this.shootAfter) {
        this.queue(() => {
          this.retry();
        });
      }
    }
  }
}

export { Shoot };
