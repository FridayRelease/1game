import { PositionProps } from './types';
import IconCrown from '../icons/crown';

const Position = ({ position, className }: PositionProps) => {
  const color = ['gold', 'silver', 'bronze'][position - 1];
  const content = color ? <IconCrown fillColor={`var(--${color})`} /> : position;

  return <div className={className}>{content}</div>;
};

export default Position;
