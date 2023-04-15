import { Icons } from './icon';

interface IconProps {
  type: Icons;
  className?: string;
  fill?: string;
  stroke?: string;
}

type IconComponentType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;

export { type IconProps, type IconComponentType };
