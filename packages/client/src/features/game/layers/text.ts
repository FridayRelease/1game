import { Font } from '../font';

function createTextLayer(font: Font, text: string) {
  const size = font.size;

  return function drawText(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }

    const textW = text.length;
    const screenW = Math.floor(ctx.canvas.width / size);
    const screenH = Math.floor(ctx.canvas.height / size);
    const x = screenW / 2 - textW / 2;
    const y = screenH / 2;
    font.print(text, ctx, x * size, y * size);
  };
}

export { createTextLayer };
