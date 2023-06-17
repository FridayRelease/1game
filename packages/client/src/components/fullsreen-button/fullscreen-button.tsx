import React from 'react';
import useFullscreen from '@/hooks/use-fullscreen';
import Icon, { Icons } from '@/components/icon/icon';
import './fullscreen-button.scss';
import { cn } from '@/utils/cn';
import { useDispatch, useSelector } from 'react-redux';
import { configActions, configSelectors } from '@/store/slices/config-slice';

const FullscreenButton = () => {
  const isFullscreen = useSelector(configSelectors.isFullScreen);
  const dispatch = useDispatch();
  const { activateFullscreen, deactivateFullscreen } = useFullscreen();

  const onChangeFullscreen = () => {
    dispatch(configActions.setTheme(!isFullscreen.value))
    if (isFullscreen.value) {
      deactivateFullscreen()
    } else {
      activateFullscreen()
    }
  }

  return (
    <span
      className={cn('full-screen', { 'full-screen--active': isFullscreen.value })}
      onClick={onChangeFullscreen}
    >
      <Icon type={Icons.Fullscreen} className="full-screen__logo" stroke={isFullscreen.value ? `var(--main-bg-alert)` : 'white'} />
      Полноэкранный режим
    </span>
  )
};

export default FullscreenButton;
