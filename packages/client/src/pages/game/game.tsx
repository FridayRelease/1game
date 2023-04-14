import { memo } from 'react';

import { Game } from '../../features/game';
import './game.css';

function GamePage() {
  return <Game />;
}

export default memo(GamePage);
