import { Entity } from './entity';
import { PlayerController } from './traits/player-controller';

const createPlayerEnv = (playerEntity: Entity) => {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(60, 232);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);

  return playerEnv;
};

export { createPlayerEnv };
