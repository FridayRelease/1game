import Position from '../position';
import './leaderboard-list.scss';
import { LeaderboardSelectors } from '@/store/slices/leaderboard-slice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLeaderboardDatas } from '@/controllers/lider-controller';
import { IQuery } from '@/api/types';
import LeaderboardItem from './leaderboard-item';

const LeaderboardList = () => {
  const [list, setData] = useState<any>([]);

  useEffect(() => {
    const query: IQuery = {
      // сортировка score, 1 страница на 10 записей
      ratingFieldName: 'score',
      cursor: 0,
      limit: 10,
    };

    (async () => {
      const res = await getLeaderboardDatas(query);

      setData(res);
      console.warn(res);
    })();
  }, []);

  return (
    <ul className="leaderboard__data">
      {list.map(({ data }: any, index: number) => (
        <LeaderboardItem position={index + 1} item={data} />
      ))}
    </ul>
  );
};

export default LeaderboardList;
