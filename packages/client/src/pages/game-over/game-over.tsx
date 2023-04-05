import { FC, useEffect } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import './game-over.scss';

const RESTART_KEY_CODE = 'KeyR';

const GameOverPage: FC = () => {
  useEffect(() => {
    document.onkeydown = (evt: KeyboardEvent) => {
      if (evt.code === RESTART_KEY_CODE) {
        console.log('restart');
      }
    };

    return () => {
      document.onkeydown = null;
    };
  }, []);

  return (
    <div className="game-over-page">
      <main className="container game-over">
        <div className="game-over__content">
          <h1 className="game-over__title">Игра окончена</h1>
          <p className="game-over__hint">Нажмите r для рестарта</p>
        </div>
      </main>
    </div>
  );
};

export default withLayoutMain(GameOverPage);
