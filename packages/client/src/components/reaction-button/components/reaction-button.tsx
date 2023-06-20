import React, { FC } from 'react';
import { cn } from '@/utils/cn';
import './reaction-button.scss'
import { reactionEmoji } from '@/constant/reactions';

type Props = {
  emoji: any;
  count?: number;
  hasReaction?: boolean;
}

const ReactionButton: FC<Props> = ({ emoji, count, hasReaction = false }) => {
  return (
    <div className={cn('reaction-button', { 'reaction-button--reaction': hasReaction })}>
      {count && <span>{count}</span>}
      {String.fromCodePoint(reactionEmoji[emoji])}
    </div>
  );
};

export default ReactionButton;
