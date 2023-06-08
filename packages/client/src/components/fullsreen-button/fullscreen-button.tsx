import React, { useState } from 'react';
import useFullscreen from '@/hooks/use-fullscreen';
import Icon, { Icons } from '@/components/icon/icon';
import './fullscreen-button.scss';
import { cn } from '@/utils/cn';

const FullscreenButton = () => {
  const [isFullscreen, setFullscreen] = useState(false);
  const { activateFullscreen, deactivateFullscreen } = useFullscreen();

  const onChangeFullscreen = () => {
    if (isFullscreen) {
      deactivateFullscreen(setFullscreen)
    } else {
      activateFullscreen(setFullscreen)
    }
  }

  return (
    <span
      className={cn('full-screen', { 'full-screen--active': isFullscreen })}
      onClick={onChangeFullscreen}
    >
      <Icon type={Icons.Fullscreen} className="full-screen__logo" stroke={isFullscreen ? `var(--main-bg-alert)` : 'white'} />
      Полноэкранный режим
    </span>
  )
};

export default FullscreenButton;
