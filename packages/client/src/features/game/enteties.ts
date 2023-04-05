import { fetchEnemy, fetchTank } from '@/controllers/game-controllers';
import { EntityFactoryCallback } from './types';

function loadEntities() {
  const entityFactory: Record<string, EntityFactoryCallback> = {};

  return Promise.all([
    fetchTank().then(factory => (entityFactory['tank'] = factory)),
    fetchEnemy().then(factory => (entityFactory['enemy'] = factory)),
  ]).then(() => entityFactory);
}

export { loadEntities };
