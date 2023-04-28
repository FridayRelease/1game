import { Font } from '@/features/game/font';
import { PlayerController } from '../traits/player-controller';

function createDashboardLayer(font: Font, playerEnv: PlayerController) {
  return function drawDashboard(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }

    const lives = playerEnv.lives;
    const level = 1;

    font.print('**', ctx, 230, font.size * 2);
    font.print('**', ctx, 230, font.size * 3);

    font.print('ip', ctx, 230, font.size * 17);
    font.print('&', ctx, 229, font.size * 18);
    font.print(lives.toString().padStart(1, '0'), ctx, 240, font.size * 18);

    font.print('@', ctx, 230, font.size * 25);
    font.print(level.toString().padStart(2, '0'), ctx, 235, font.size * 25 + 15);
  };
}

export { createDashboardLayer };
