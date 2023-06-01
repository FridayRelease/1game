import Position from '../../../../components/position';
import './leaderboard-list.scss';

interface ILeaderboardItem {
  position: number;
  item: {
    name: string;
    score: number;
  };
}

const LeaderboardItem = ({ position, item }: ILeaderboardItem) => {
  return (
    <li className="leaderboard__row" key={position}>
      <Position className="leaderboard__position" position={position} />
      <div className="leaderboard__name">{item.name}</div>
      <div className="leaderboard__score">{item.score}</div>
    </li>
  );
};

export default LeaderboardItem;
