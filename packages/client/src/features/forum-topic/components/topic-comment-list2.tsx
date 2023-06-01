import './topic-comment.scss';
import {useDispatch, useSelector} from "react-redux";
import {ForumActions, ForumSelectors} from "@/store/slices/forum-slice";
import {Comments} from "@/features/forum-topic/components/comments";
import {mockComments} from "@/mock/mockComments";
import {useEffect, useState} from "react";
import {getUsers} from "@/controllers/forum-topic-controller";
import {getCommentsById, getCommentsByTopicId} from "@/controllers/forum-comments-controller";
import {IComment} from "@/api/types";

const TopicCommentList2 = () => {
    const dispatch = useDispatch();
    const init_state = useSelector(ForumSelectors.comments);
    const [list, setList] = useState(init_state);
    console.log('list = ', list)
    const [lastId, setLastId] = useState(useSelector(ForumSelectors.id));
    const id = useSelector(ForumSelectors.id);
    async function fetchData() {
        console.log('id in function getCommentsById = ', id)
        const response: any = await getCommentsByTopicId(id);
        console.log('responce = ', response)
        const commentId = response[0].id
        console.log('topicId, commentId = ', id, commentId)

        const comments = await getCommentsById(commentId)
        console.log('comments = ', comments)
        const arr:IComment[] = []
        //@ts-ignore
        arr.push(comments)

        dispatch(ForumActions.setCommentsFromServerToStore(arr));
        console.log('comments с Сервера= ' , ForumSelectors.comments)

        setList(arr);
    }


    useEffect(() => {
       fetchData();
    }, []);

    return (
        <ul className="comment-list column">
            <div>
                <h1 className='topic-list-title'>Сообщения </h1>
                <Comments key={list[0].id} children={list}/>
            </div>
        </ul>
    );
};

export default TopicCommentList2;