import Position from '../position';
import './leaderboard-list.scss';
import { LeaderboardSelectors } from '@/store/slices/leaderboard-slice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLeaderboardDatas } from '@/controllers/lider-controller';
import { IQuery } from '@/api/types';
import LeaderboardItem from './leaderboard-item';

const LeaderboardList = () => {
  const [data, setData] = useState<any>([]);
  const leaderboardListData = useSelector(LeaderboardSelectors.all);

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
    })();
  }, []);


  const copyArray = [...leaderboardListData.leaderboard];
  const sortedArray = copyArray.sort((a, b) => Number(b.score) - Number(a.score));

  return (
    <ul className="leaderboard__data">
      {sortedArray.map((item, index) => (
        <LeaderboardItem position={index + 1} item={item} />
      ))}
    </ul>
  );
};

export default LeaderboardList;
