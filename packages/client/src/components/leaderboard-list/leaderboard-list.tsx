// import { LeaderboardListProps } from './types';
import { LeaderboardListDTO } from '@/api/types';
import Position from '../position';
import './leaderboard-list.scss';

const LeaderboardList = () => {
  const leaderboardListData: LeaderboardListDTO = [
    { id: 1, name: 'Player 1', score: 1000 },
    { id: 2, name: 'Player 2', score: 900 },
    { id: 3, name: 'Player 3', score: 800 },
    { id: 4, name: 'Player 4', score: 1700 },
    { id: 5, name: 'Player 5', score: 600 },
    { id: 6, name: 'Player 6', score: 500 },
    { id: 7, name: 'Player 7', score: 400 },
  ];

  leaderboardListData.sort((a, b) => b.score - a.score);

  const itemList = leaderboardListData.map((item, index) => {
    const position = index + 1;

    return (
      <li className="leaderboard__row" key={item.id}>
        <Position className="leaderboard__position" position={position} />
        <div className="leaderboard__name">{item.name}</div>
        <div className="leaderboard__score">{item.score}</div>
      </li>
    );
  });

  return <ul className="leaderboard__data">{itemList}</ul>;
};

export default LeaderboardList;
