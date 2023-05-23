import React, { FC, useContext, useEffect } from 'react'
import { GamepadsContext } from '@/context/game-context/gamepads-context'
import './gamepad-indicator.scss'
import useTimer from '@/hooks/useTimer'

interface IStartProps {
  handleClick: () => void;
}

const GamepadIndicator: FC<IStartProps> = ({ handleClick }) => {
  const { gamepad, hasGamepad } = useContext(GamepadsContext);
  const { handleStart, timer } = useTimer(5);

  useEffect(() => {
    if (timer === 0) handleClick();
  }, [timer])

  useEffect(() => {
    if (hasGamepad) handleStart()
  }, [hasGamepad])

  const gamepadInfo = (
    <div className="gamepad-indicator__info">
      <div className='gamepad-indicator__indicator' />
      {gamepad?.id}
    </div>
  )

  return (
    <div className="gamepad-indicator">
      {hasGamepad && <span className="gamepad-indicator__start">Игра начнется через: {timer}</span>}
      {hasGamepad && gamepad ? gamepadInfo :  <p className="gamepad-indicator__message">Чтобы подключить геймпад, нажмите люблю клавишу на геймпаде</p> }
    </div>
  )
}

export default GamepadIndicator
