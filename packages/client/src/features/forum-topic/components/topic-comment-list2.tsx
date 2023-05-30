import './topic-comment.scss';
import {useDispatch, useSelector} from "react-redux";
import {ForumActions, ForumSelectors} from "@/store/slices/forum-slice";
import {Comments} from "@/features/forum-topic/components/comments";
import {mockComments} from "@/mock/mockComments";
const TopicCommentList2 = () => {
    const dispatch = useDispatch();
    const list = mockComments//useSelector(ForumSelectors.forum);
    console.log('list in topic-comment-list2 = ', list)
    const id = 5//useSelector(ForumSelectors.id);

    return (
        <ul className="comment-list column">
            <div>
                <h1>Object will be this place</h1>
                <Comments children={list}/>
            </div>
        </ul>
    );
};

export default TopicCommentList2;