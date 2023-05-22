import Position from '../position';
import './leaderboard-list.scss';

const LeaderboardItem = ({ position, item }: any) => {
  return (
    <li className="leaderboard__row" key={position}>
      <Position className="leaderboard__position" position={position} />
      <div className="leaderboard__name">{item.name}</div>
      <div className="leaderboard__score">{item.score}</div>
    </li>
  );
};

export default LeaderboardItem;
