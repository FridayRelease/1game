import { FC } from 'react';
import { cn } from '@/utils/cn';
import IMenu, { MenuState, MenuType } from './menu.interface';
import './menu.scss';

const Menu: FC<IMenu> = ({
  title,
  className,
  state = MenuState.DEFAULT,
  type = MenuType.DEFAULT,
  children,
  disabled,
  onClick,
}) => {
  const buttonClassName = cn('profile-menu__button', `profile-menu__button--${state}`);
  const buttonType = type === MenuType.SUBMIT ? 'submit' : 'button';
  const buttonDisabled = disabled ?? state === MenuState.ERROR;

  return (
    <div className={cn(className, 'profile-menu')}>
      {children}
      <button
        className={buttonClassName}
        type={buttonType}
        disabled={buttonDisabled}
        onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Menu;
