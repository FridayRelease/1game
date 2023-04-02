import { PositionProps } from './types';
import IconCrown from '../icons/crown';

const Position = ({ position, className }: PositionProps) => {
  if (position === 1) {
    return (
      <div className={className}>
        <IconCrown fillColor={'var(--gold)'} />
      </div>
    );
  } else if (position === 2) {
    return (
      <div className={className}>
        <IconCrown fillColor={'var(--silver)'} />
      </div>
    );
  } else if (position === 3) {
    return (
      <div className={className}>
        <IconCrown fillColor={'var(--bronze)'} />
      </div>
    );
  }

  return <div className={className}>{position}</div>;
};

export default Position;
