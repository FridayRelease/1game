import React, { useContext } from 'react'
import { GamepadsContext } from '@/context/game-context/gamepads-context'
import { truncateText } from '@/utils/functions'
import './gamepad.scss';

const Gamepad = () => {
  const { gamepad, hasGamepad } = useContext(GamepadsContext);

  if (hasGamepad && gamepad) {
    return (
      <div className="gamepad-popup gamepad-popup--status-success">
        <div className="gamepad-popup__item">
          <div className='gamepad-popup__row'>
            <div className='gamepad-popup__content'>
              <span className="gamepad-popup__title">Подключен геймпад</span>
              <span
                className="gamepad-popup__controller"
                title={gamepad.id}
              >
                {truncateText(gamepad.id, 30)}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <></>
}

export default Gamepad
