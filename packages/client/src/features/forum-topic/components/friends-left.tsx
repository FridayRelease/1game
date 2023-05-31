import './topic-comment.scss';
import {FC, useEffect, useState} from "react";
import {Ring} from "@/features/forum-topic/components/ring";
import {Users} from "@/mock/mockUsers";
import { ForumActions, ForumSelectors } from '../../../store/slices/forum-slice';
import { useSelector, useDispatch } from 'react-redux';
import {getTopicsAll, getUsers} from "@/controllers/forum-topic-controller";


/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const Friends: FC = () => {
    const dispatch = useDispatch();
    const init_state = useSelector(ForumSelectors.friends);
    const [list, setList] = useState(init_state);

    useEffect(() => {
        async function fetchData() {
            const response:any = await getUsers();
            console.log('users list in friends-left = ', response.data)
            if (response.data!==undefined && response.status === 200){
                setList(response.data);
                dispatch(ForumActions.setUsersFromServerToStore(response.data));
            }


        }
        fetchData();
    }, []);



    return (
        <div className="friends row ">
            {list.map(( li : any, index: number) => (
                <Ring key={index} avatar={li.avatar} name={li.display_name}/>

            ))}
        </div>
    );
};