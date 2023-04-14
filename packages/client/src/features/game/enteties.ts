import { Entities } from '@/constant/entities';
import { fetchEnemy, fetchTank, fetchBullet } from '@/controllers/game-controllers';
import { EntityFactoryCallback } from './types';

function loadEntities(audioContext: AudioContext) {
  const entityFactory: Record<string, EntityFactoryCallback> = {};

  return Promise.all([
    fetchTank(audioContext).then(factory => (entityFactory[Entities.Tank] = factory)),
    fetchEnemy().then(factory => (entityFactory[Entities.Enemy] = factory)),
    fetchBullet().then(factory => (entityFactory[Entities.Bullet] = factory)),
  ]).then(() => entityFactory);
}

export { loadEntities };
