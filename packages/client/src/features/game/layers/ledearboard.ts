import { Font } from '@/features/game/font';

function createLeaderboardLayer(font: Font, enemies: number, score?: number) {
  return function drawDashboard(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }

    font.print(String(score), ctx, 100, font.size * 17);
    font.print('score', ctx, 150, font.size * 17);

    font.print(String(enemies), ctx, 100, font.size * 19);
  };
}

export { createLeaderboardLayer };
