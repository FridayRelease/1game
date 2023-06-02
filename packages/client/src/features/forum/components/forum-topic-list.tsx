import { useEffect, useState } from 'react';
import { getTopicsAll } from '@/controllers/forum-topic-controller';
import ForumTopicItem from '@/features/forum/components/forum-topic-item';

import { useDispatch, useSelector } from 'react-redux';
import { ForumActions, ForumSelectors } from '@/store/slices/forum-slice';
import {ITopic} from "@/api/types";

/**
 Компонент форума cо списком Топиков
 @category component
 */
const ForumTopicList = () => {
  const dispatch = useDispatch();

  const init_state:ITopic[] = useSelector(ForumSelectors.topics);
  const [list, setList] = useState(init_state);

  useEffect(() => {
    async function fetchData() {
      const response: any = await getTopicsAll();

      setList(response.rows);
      dispatch(ForumActions.setTopicsFromServerToStore(response.rows));
    }
    fetchData();
  }, [init_state]);

  return (
    <ul className="">
      {list.map((data: any, index: number) => (
        <ForumTopicItem key={index} topic={data} />
      ))}
    </ul>
  );
};

export default ForumTopicList;
