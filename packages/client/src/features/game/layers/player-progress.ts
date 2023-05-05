import { Traits } from '@/constant/traits';
import { Entity } from '../entity';
import { Font } from '../font';
import { Level } from '../level';
import { Player } from '../traits/player';
import { PlayerController } from '../traits/player-controller';

function getPlayer(entities: Set<Entity>): Entity | null | undefined {
  for (const entity of entities) {
    if (entity.traits.has(Traits.PlayerController)) {
      return (entity.traits.get(Traits.PlayerController) as PlayerController).player;
    }
  }
}

export function createPlayerProgressLayer(font: Font, level: Level) {
  const size = font.size;

  return function drawPlayerProgress(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }

    const entity = getPlayer(level.entities);
    const player = entity?.traits.get(Traits.Player) as Player;
    const lives = player?.lives || 0;
    const score = player?.score || 0;

    font.print('stage ' + level.name, ctx, size * 12, size * 12);

    font.print('& ' + lives.toString().padStart(3, ' '), ctx, size * 16, size * 16);

    font.print('score ' + score.toString().padStart(3, ' '), ctx, size * 16, size * 20);
  };
}
