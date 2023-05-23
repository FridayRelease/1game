import { memo, FC, ReactEventHandler, useRef } from 'react'
import './start-game.scss';
import { ReactComponent as IconStart } from '@/assets/images/icons/start.svg';
import GamepadIndicator from '@/components/gamepad-indicator/gamepad-indicator'

interface IStartProps {
  isStarted: boolean;
  handleClick: ReactEventHandler<HTMLButtonElement>;
}

const StartGame: FC<IStartProps> = ({ isStarted, handleClick }) => {
  const refButton = useRef<HTMLButtonElement>(null);
  if (isStarted) {
    return null;
  }

  const onStartGame = () => {
    refButton?.current?.click()
  }

  return (
    <div className="start-game__container">
      <button ref={refButton} onClick={handleClick} type="button">
        <IconStart />
      </button>
      <GamepadIndicator handleClick={onStartGame} />
    </div>
  );
};

export default memo(StartGame);
