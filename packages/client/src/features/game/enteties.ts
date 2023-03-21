import { loadEnemy } from './enteties/enemy';
import { loadTank } from './enteties/tank';
import { EntityFactoryCallback } from './types';

function loadEntities() {
  const entityFactory: Record<string, EntityFactoryCallback> = {};

  return Promise.all([
    loadTank().then(factory => (entityFactory['tank'] = factory)),
    loadEnemy().then(factory => (entityFactory['enemy'] = factory)),
  ]).then(() => entityFactory);
}

export { loadEntities };
