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
  return (
    <div className={cn(className, 'profile-menu')}>
      {children}
      <button
        className={cn('profile-menu__button', `profile-menu__button--${state}`)}
        type={type === MenuType.SUBMIT ? 'submit' : 'button'}
        disabled={!!disabled || state === MenuState.ERROR}
        onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Menu;
