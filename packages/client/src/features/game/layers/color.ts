function createColorLayer(color: string) {
  return function drawColor(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };
}

export { createColorLayer };
