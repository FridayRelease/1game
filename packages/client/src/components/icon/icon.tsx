import { IconProps } from './types';
import { getIconComponentByType } from '@/utils/get-icon-component-by-type';

export enum Icons {
  Profile = 'profile',
  Trophy = 'trophy',
  Forum = 'forum',
  Logout = 'logout',
  Gamepad = 'Gamepad',
  GamepadD = 'GamepadD',
  GamepadActiveButton = 'GamepadActiveButton',
}

const Icon = ({ type, className, fill = 'none', stroke = 'none' }: IconProps) => {
  const IconComponent = getIconComponentByType(type);

  return IconComponent ? <IconComponent className={className} fill={fill} stroke={stroke} /> : <></>;
};

export default Icon;
