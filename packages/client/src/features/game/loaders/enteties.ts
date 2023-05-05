import { Entities } from '@/constant/entities';
import { fetchEnemy, fetchTank, fetchBullet } from '@/controllers/game-controllers';
import { Entity } from '../entity';
import { EntityFactoryCallback } from '../types';

function loadEntities(audioContext: AudioContext) {
  const entityFactories: Record<string, EntityFactoryCallback> = {};

  const addAs = (name: string) => {
    return (factory: () => Entity) => (entityFactories[name] = factory);
  };

  return Promise.all([
    fetchBullet().then(addAs(Entities.Bullet)),
    fetchTank(audioContext, entityFactories).then(addAs(Entities.Tank)),
    fetchEnemy(entityFactories).then(addAs(Entities.Enemy)),
  ]).then(() => entityFactories);
}

export { loadEntities };
