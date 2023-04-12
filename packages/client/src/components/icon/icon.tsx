import { ReactComponent as IconProfile } from '@/assets/images/icons/profile.svg';
import { ReactComponent as IconTrophy } from '@/assets/images/icons/trophy.svg';
import { ReactComponent as IconForum } from '@/assets/images/icons/forum.svg';
import { ReactComponent as IconLogout } from '@/assets/images/icons/logout.svg';
import { IconsComponentType, IconType } from './types';

const Icon = ({ type, className, fill, stroke }: IconType) => {
  const icons: IconsComponentType = { IconProfile, IconTrophy, IconForum, IconLogout };

  const IconComponent = icons[`Icon${type}`];

  return <IconComponent className={className} fill={fill ?? 'none'} stroke={stroke ?? 'none'} />;
};

export default Icon;
