import { Entity } from '../entity';

function createSpriteLayer(entities: Set<Entity>, width = 64, height = 64) {
  const spriteBuffer = document.createElement('canvas');
  spriteBuffer.width = width;
  spriteBuffer.height = height;

  const spriteBufferCtx = spriteBuffer.getContext('2d');

  return function (ctx: CanvasRenderingContext2D | null) {
    entities.forEach(entity => {
      spriteBufferCtx?.clearRect(0, 0, width, height);

      entity.draw(ctx);

      ctx?.drawImage(spriteBuffer, entity.pos.x, entity.pos.y);
    });
  };
}

export { createSpriteLayer };
