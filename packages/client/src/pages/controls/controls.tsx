import React, { FC } from 'react'
import withLayoutMain from '@/layout/layoutMain/layoutMain'
import Icon from '@/components/icon'
import { Icons } from '@/components/icon/icon'
import './controls.scss'

const Controls: FC = () => {
  return (
    <div className="controls">
      <p className='controls__title'>Управление</p>
      <div className='controls__box'>
      <p className='controls__box-title'>Геймпад</p>
        <div className='controls__row'>
          <div className='controls__info-box'>
            <Icon type={Icons.GamepadD} className={''} fill={'#000'} stroke={'#000'} />
            <div className='controls__info-list'>
              <p className='controls__text-item'>Вверх</p>
              <p className='controls__text-item'>Вправо</p>
              <p className='controls__text-item'>Влево</p>
              <p className='controls__text-item'>Вниз</p>
            </div>
          </div>
          <div className='controls__info-box'>
            <Icon type={Icons.GamepadActiveButton} className={''} fill={'#000'} stroke={'#000'} />
            <div className='controls__info-list'>
              <p className='controls__text-item'>Стрельба</p>
            </div>
          </div>
        </div>
        <Icon type={Icons.Gamepad} className={''} fill={'#000'} stroke={'#000'} />
      </div>
    </div>
  )
}

export default withLayoutMain(Controls)
