import { memo } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';

import { Game } from '../../features/game';
import './game.css';
import ToggleTheme from '@/components/toggle-theme';
import { Link } from 'react-router-dom';

function GamePage() {
  return (
    <div className="game__container">
      <p className="layout-main__label">
        <Link to="/" className="layout-main__link">
          Главная
        </Link>
        /
        <a href="https://github.com/FridayRelease/1game" target="_blank" className="layout-main__link">
          Friday release
        </a>
        /
        <a href="https://practicum.yandex.ru/middle-frontend/" className="layout-main__link">
          yandex 23
        </a>
      </p>
      <div>
        <ToggleTheme />
      </div>
      <Game />
    </div>
  );
}

export default memo(GamePage);
