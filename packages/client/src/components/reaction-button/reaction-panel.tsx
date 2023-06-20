import React, { FC, useMemo, useState } from 'react';
import ReactionButton from '@/components/reaction-button/components/reaction-button';
import Icon from '@/components/icon';
import { Icons } from '@/components/icon/icon';
import './reaction-panel.scss';
import { Reactions } from '@/constant/reactions';

interface TProps {
  reaction: Record<string, any>
}

const ReactionPanel: FC<TProps> = ({ reaction }) => {
  const [isShown, setIsShown] = useState(false);

  const getUnreactive = useMemo(() => {
    const hasReaction = Object.values(reaction).map(item => item.id);
    const reactionConsts = Object.values(Reactions).map(item => Number(item));

    return reactionConsts.filter(item => !hasReaction.includes(item));
  }, [reaction])

  return (
    <div className={'reaction-panel'}>
      {Object.values(reaction).map((item) =>
        <>
          <ReactionButton emoji={item.id} count={item.count} hasReaction={item.hasCurrentUserReacted} />
        </>
      )}
      <div className={'reaction-panel__icon'} onClick={() => setIsShown(!isShown)}>
        <Icon type={Icons.AddReaction} className={'reaction-panel__icon-add'} fill={'white'} />
      </div>
      {isShown &&
        <div className={'reaction-panel__add-new'}>
          {getUnreactive.map(item => <ReactionButton emoji={item} />)}
        </div>
      }
    </div>
  );
};

export default ReactionPanel;
