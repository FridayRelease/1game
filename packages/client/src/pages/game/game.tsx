import { memo } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';

import { Game } from '../../features/game';
import './game.css';

function GamePage() {
  return <Game />;
}

export default memo(withLayoutMain(GamePage));
