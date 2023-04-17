import { Entities } from '@/constant/entities';
import { fetchEnemy, fetchTank, fetchBullet, fetchEagle } from '@/controllers/game-controllers';
import { EntityFactoryCallback } from './types';

function loadEntities() {
  const entityFactory: Record<string, EntityFactoryCallback> = {};

  return Promise.all([
    fetchTank().then(factory => (entityFactory[Entities.Tank] = factory)),
    fetchEnemy().then(factory => (entityFactory[Entities.Enemy] = factory)),
    fetchBullet().then(factory => (entityFactory[Entities.Bullet] = factory)),
    fetchEagle().then(factory => (entityFactory[Entities.Eagle] = factory)),
  ]).then(() => entityFactory);
}

export { loadEntities };
