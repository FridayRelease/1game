import { IUserDTO } from '@/api/types';
import { Traits } from '@/constant/traits';
import { Entity } from './entity';
import { Player } from './traits/player';
import { PlayerController } from './traits/player-controller';

const createPlayerEnv = (playerEntity: Entity, userInfo: IUserDTO | null) => {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(60, 232);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);

  if (userInfo?.login) {
    const player = playerEntity.getTrait(Traits.Player) as Player;
    player.name = userInfo.login;
  }

  return playerEnv;
};

export { createPlayerEnv };
