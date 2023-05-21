import { memo, FC, ReactEventHandler } from 'react'
import './start-game.scss';
import { ReactComponent as IconStart } from '@/assets/images/icons/start.svg';
import GamepadIndicator from '@/components/gamepad-indicator/gamepad-indicator'

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
        <IconStart />
      </button>
      <GamepadIndicator handleClick={handleClick} />
    </div>
  );
};

export default memo(StartGame);
