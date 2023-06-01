import './topic-comment.scss';
import {useDispatch, useSelector} from "react-redux";
import {ForumActions, ForumSelectors} from "@/store/slices/forum-slice";
import {Comments} from "@/features/forum-topic/components/comments";
import {mockComments} from "@/mock/mockComments";
import {useEffect, useState} from "react";
import {getUsers} from "@/controllers/forum-topic-controller";
import {getCommentsById, getCommentsByTopicId} from "@/controllers/forum-comments-controller";

const TopicCommentList2 = () => {
    const dispatch = useDispatch();
    const init_state = useSelector(ForumSelectors.comments);
    const [list, setList] = useState(init_state);
    const [lastId, setLastId] = useState(useSelector(ForumSelectors.id));
    const id = useSelector(ForumSelectors.id);
    async function fetchData() {
        console.log('id in function getCommentsById = ', id)
        const response: any = await getCommentsByTopicId(id);
        const commentId = response[0].id
        console.log('topicId, commentId = ', id, commentId)
        //console.log('Comments list in topic-comment-list2 = ', response)

        const comments = await getCommentsById(commentId)
        const arr = [comments]
        console.log('comments = ', comments)
        //dispatch(ForumActions.setCommentsFromServerToStore(comments))
        setList(arr);
    }

    if (id !==lastId){
        setLastId(id);
        fetchData();
        }

   // console.log('id in TopicCommentList2= ', id)

    useEffect(() => {
       fetchData();
    }, []);

    return (
        <ul className="comment-list column">
            <div>
                <h1 className='topic-list-title'>Сообщения </h1>
                <Comments key={list.id} children={list}/>
            </div>
        </ul>
    );
};

export default TopicCommentList2;