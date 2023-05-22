import { FC, useEffect } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import { ILeaderboardAddUser, IQuery } from '@/api/types';
import { addUserDatasToServer, getLeaderboardDatas, setUserDatasToStore } from '@/controllers/lider-controller';
import { useDispatch, useSelector } from 'react-redux';
import { LeaderboardSelectors } from '@/store/slices/leaderboard-slice';
import { Link } from 'react-router-dom';

/**
 * Страница proba
 *
 * @category page
 */
const Proba: FC = () => {
  const dispatch = useDispatch();
  const data = { name: 'SEM', score: 500 };
  const info: ILeaderboardAddUser = {
    data: data,
    ratingFieldName: 'score',
    teamName: '1game',
  };

  console.log('file use-start data {name, score} to server', data);
  let leaderboardListData = useSelector(LeaderboardSelectors.all);
  //----сравнение и запись в локальный Store--------
  if (data.name !== undefined && data.score !== undefined) {
    console.log('Проверяет пользователя и его очки = ', data);
    const length = leaderboardListData.leaderboard.length;
    for (let i = 0; i < length; i++) {
      if (leaderboardListData.leaderboard[i].name === data.name) {
        console.log('Пользователь уже играл, проверяем его лучший результат');
        if (leaderboardListData.leaderboard[i].score < data.score) {
          setUserDatasToStore(data, dispatch); //запись в Store
          console.log('Очки игрока в Стор записали');
          break;
        } else {
          console.log('Данные по очкам Игрока проверили, записывать не стали');
          break;
        }
      }
      if (leaderboardListData.leaderboard[i].name !== data.name && i == length - 1) {
        setUserDatasToStore(data, dispatch); //запись в Store
        console.log('Нового игрока и его очки в Стор записали');
      }
    }
  }
  //------получение информации из стора и сортировка перед выводом на экран----
  leaderboardListData = useSelector(LeaderboardSelectors.all);
  console.log('leaderboardListData = ', leaderboardListData);
  const copyArray = [...leaderboardListData.leaderboard];
  const sortedArray = copyArray.sort((a, b) => Number(b.score) - Number(a.score));
  console.log('sortedArray = ', sortedArray);
  //--------

  //-------------------
  //const gameName =  '1game'
  const query: IQuery = {
    // сортировка score, 1 страница на 10 записей
    ratingFieldName: 'score',
    cursor: 0,
    limit: 10,
  };
  // получаем с сервера данные игрока и его очки и записываем в Store
  console.log('start getLeaderboardDatas');
  console.log('end getLeaderboardDatas');

  useEffect(() => {
    (async () => {
      //--------------
      try {
        const result = await getLeaderboardDatas(query); // от тут валится приложение,
        const res2 = await addUserDatasToServer(info); // Запись на Сервер - // и вот тут валится приложение, поскольку обращается к локальному адресу
        console.log('Данные игрока и очки на Сервер записали');

        console.warn(result, res2);
      } catch (e) {
        //console.log('Ошибка записи на сервер результатов Игрока', e)
      }
    })();

    //----------
  }, []);

  return (
    <div className="leaderboard">
      <h1>Proba page</h1>
      <Link to="/leaderboard"> Перейти в Leader </Link>
    </div>
  );
};

Proba.displayName = 'Leaderboard';

export default withLayoutMain(Proba);
