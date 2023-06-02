import './topic-comment.scss';
import {useDispatch, useSelector} from 'react-redux';
import {ForumActions, ForumSelectors} from '@/store/slices/forum-slice';
import {Comments} from '@/features/forum-topic/components/comments';

import {useEffect, useState} from 'react';

import {getCommentsById, getCommentsByTopicId} from '@/controllers/forum-comments-controller';
import {IComment} from '@/api/types';

const TopicCommentList2 = () => {
    const dispatch = useDispatch();
    const init_state = useSelector(ForumSelectors.comments);
    const [list, setList] = useState(init_state);
    console.log('list = ', list);
    const id = useSelector(ForumSelectors.id);

    async function fetchData() {

        const response: any = await getCommentsByTopicId(id);
        const commentId = response[0].id;
        const comments = await getCommentsById(commentId);
        const arr: IComment[] = [];
        //@ts-ignore
        arr.push(comments);
        dispatch(ForumActions.setCommentsFromServerToStore(arr));
        setList(arr);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ul className="comment-list column">
            <div>
                <h1 className="topic-list-title">Сообщения </h1>
                <Comments key={list[0].id} children={list}/>
            </div>
        </ul>
    );
};

export default TopicCommentList2;
