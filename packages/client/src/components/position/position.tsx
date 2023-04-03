import { PositionProps } from './types';
import { ReactComponent as IconCrown } from '@/assets/images/icons/crown.svg';

const Position = ({ position, className }: PositionProps) => {
  const color = ['gold', 'silver', 'bronze'][position - 1];
  const content = color ? <IconCrown fill={`var(--${color})`} /> : position;

  return <div className={className}>{content}</div>;
};

export default Position;
