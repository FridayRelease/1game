import { memo } from 'react';

import { Game } from '../../features/game';
import './game.css';

function GamePage() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default memo(GamePage);
