import { Entity } from './entity';
import { Matrix } from './math';
import { TileCollider } from './tile-collider';
import { EntityCollider } from './entity-collider';
import { GameContext } from './types';
import { MusicController } from './music-controller';
import { Scene } from './scene';
import { ITriggersDTO } from '@/api/types';

class Level extends Scene {
  static EVENT_TRIGGER = 'trigger';

  entities: Set<Entity>;
  triggers: Map<string, ITriggersDTO>;
  tiles: Matrix;
  tileCollider: TileCollider | null;
  totalTime: number;
  entityCollider: EntityCollider;
  music: MusicController;
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
    this.entities = new Set();
    this.triggers = new Map();
    this.tiles = new Matrix();
    this.tileCollider = new TileCollider();
    this.music = new MusicController();

    this.entityCollider = new EntityCollider(this.entities);
    this.totalTime = 0;
  }

  update(gameContext: GameContext) {
    this.entities.forEach(entity => {
      entity.update(gameContext, this);
    });

    this.entities.forEach(entity => {
      this.entityCollider?.check(entity);
    });

    this.entities.forEach(entity => {
      entity.finalize();
    });
  }

  draw(gameContext: GameContext) {
    this.comp.draw(gameContext.videoContext);
  }

  pause() {
    this.music.pause();
  }
}

export { Level };
