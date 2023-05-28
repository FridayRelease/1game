import { Traits } from '@/constant/traits';
import { Font } from '@/features/game/font';
import { Entity } from '../entity';
import { Level } from '../level';
import LevelTimer from '../traits/level-timer';
import { findPlayer, Player } from '../traits/player';

const getPlayerTrait = (entities: Set<Entity>): Player | undefined => {
  for (const entity of findPlayer(entities)) {
    return entity.traits.get(Traits.Player) as Player;
  }

  return undefined;
};

const getTimerTrait = (entities: Set<Entity>): LevelTimer | undefined => {
  for (const entity of entities) {
    if (entity.traits.has(Traits.LevelTimer)) {
      return entity.traits.get(Traits.LevelTimer) as LevelTimer;
    }
  }

  return undefined;
};

const getColumn = (n: number) => {
  if (n <= 0) {
    return [];
  }
  return [...Array(n).keys()];
};

function createDashboardLayer(font: Font, level: Level) {
  const timerTrait = getTimerTrait(level.entities);

  return function drawDashboard(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }

    const playerTrait = getPlayerTrait(level.entities);

    const enemies = getColumn(Number(playerTrait?.totalEnemies) - Number(playerTrait?.enemiesCount) || 0);
    const lives = playerTrait?.lives || 0;

    enemies.forEach((e, index) => {
      font.print('*', ctx, 230, font.size * index + 2);
    });

    font.print('ip', ctx, 230, font.size * 17);
    font.print('&', ctx, 229, font.size * 18);
    font.print(lives.toString().padStart(1, '0'), ctx, 240, font.size * 18);

    font.print('@', ctx, 230, font.size * 25);
    font.print(level.name.toString().padStart(2, '0'), ctx, 235, font.size * 25 + 15);

    const currentTime = timerTrait?.currentTime || 0;
    font.print(currentTime.toFixed().toString().padStart(3, '0'), ctx, 225, font.size * 25 + 30);
  };
}

export { createDashboardLayer };
