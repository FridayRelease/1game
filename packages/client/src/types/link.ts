import { IconProps } from '@/components/icon/types';

type LinkType = {
  text: string;
  url?: string;
  className: string;
  icon?: IconProps;
  onClick?: () => void;
};

export { type LinkType };
