import { useEffect } from 'react';
import './leaderboard-list.scss';
import { leaderboardActions, leaderboardSelectors } from '@/features/leaderboard/store/leaderboard-slice';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardItem from './leaderboard-item';

const LeaderboardList = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector(leaderboardSelectors.all);

  useEffect(() => {
    dispatch(leaderboardActions.getScore());
  }, []);

  return (
    <ul className="leaderboard__data">
      {leaderboard.map(({ data }, index: number) => (
        <LeaderboardItem position={index + 1} item={data} key={data.name + data.score} />
      ))}
    </ul>
  );
};

export default LeaderboardList;
