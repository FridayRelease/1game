import './forum-comp.scss';
import {useNavigate} from 'react-router-dom';
import {ITopic} from "@/api/types";
import {useDispatch} from "react-redux";
import {ForumActions} from "@/store/slices/forum-slice";

/**
 Компонент Топика форума c первым сообщением
 @category component
 */

function ForumTopicItem(topic: ITopic) {
    const {topic_id, subject, user, updated_at, created_at} = topic;
    const time = updated_at !== undefined ? updated_at : created_at
    const d = new Date(Date.parse(time!)).toLocaleTimeString().slice(0, -3);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function goToTopic(topic_id: number) {
        dispatch(ForumActions.setActiveTopicIdToStore(topic_id));
        navigate(`/forum/${topic_id}`);
    }

    return (
        <div className="forum-comp forum-comp-column" onClick={() => goToTopic(topic_id)}>
            <div className="forum-message">{subject}</div>
            <div className="forum-info row">
                <div className="forum-user">{user.first_name}</div>
                <div className="forum-data">{d}</div>

            </div>
        </div>
    );
}

export default ForumTopicItem;


