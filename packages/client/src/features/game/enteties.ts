import { fetchEnemy, fetchTank, fetchBullet } from '@/controllers/game-controllers';
import { EntityFactoryCallback } from './types';

function loadEntities() {
  const entityFactory: Record<string, EntityFactoryCallback> = {};

  return Promise.all([
    fetchTank().then(factory => (entityFactory['tank'] = factory)),
    fetchEnemy().then(factory => (entityFactory['enemy'] = factory)),
    fetchBullet().then(factory => (entityFactory['bullet'] = factory)),
  ]).then(() => entityFactory);
}

export { loadEntities };
