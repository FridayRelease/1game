import { Entity } from '../entity';
import { Level } from '../level';
import { TileCollider } from '../tile-collider';

function createEntityLayer(entities: Set<Entity>) {
  return function drawBoundingBox(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'red';

    entities.forEach(entity => {
      ctx.beginPath();
      ctx.rect(entity.bounds.left, entity.bounds.top, entity.size.x, entity.size.y);
      ctx.stroke();
    });
  };
}

function createTileCandidateLayer(tileCollider: TileCollider | null) {
  if (!tileCollider) {
    return;
  }

  const resolvedTiles: { x: number; y: number }[] = [];

  const tileResolver = tileCollider?.tiles;
  const tileSize = tileResolver?.tileSize;

  const getByIndexOriginal = tileResolver?.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawTileCandidates(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'blue';

    resolvedTiles.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.rect(x * tileSize, y * tileSize, tileSize, tileSize);
      ctx.stroke();
    });

    resolvedTiles.length = 0;
  };
}

function createCollisionLayer(level: Level) {
  const drawTileCandidates = createTileCandidateLayer(level.tileCollider);
  const drawBoundingBoxes = createEntityLayer(level.entities);

  return function drawCollision(ctx: CanvasRenderingContext2D | null) {
    if (!ctx || !drawTileCandidates) {
      return;
    }

    drawTileCandidates(ctx);

    drawBoundingBoxes(ctx);
  };
}

export { createCollisionLayer };
