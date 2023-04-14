import { memo, FC, ReactEventHandler } from 'react';
import './start-game.scss';

interface IStartProps {
  isStarted: boolean;
  handleClick: ReactEventHandler<HTMLButtonElement>;
}

const StartGame: FC<IStartProps> = ({ isStarted, handleClick }) => {
  if (isStarted) {
    return null;
  }

  return (
    <div className="start-game__container">
      <button onClick={handleClick} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" viewBox="0 0 60 60">
          <path d="m45.563 29.174-22-15A1 1 0 0 0 22 15v30a.999.999 0 0 0 1.563.826l22-15a1 1 0 0 0 0-1.652zM24 43.107V16.893L43.225 30 24 43.107z"></path>
          <path d="M30 0C13.458 0 0 13.458 0 30s13.458 30 30 30 30-13.458 30-30S46.542 0 30 0zm0 58C14.561 58 2 45.439 2 30S14.561 2 30 2s28 12.561 28 28-12.561 28-28 28z"></path>
        </svg>
      </button>
    </div>
  );
};

export default memo(StartGame);
