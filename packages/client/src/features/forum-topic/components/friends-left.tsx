import './topic-comment.scss';
import {FC, useEffect, useState} from 'react';
import {Ring} from '@/features/forum-topic/components/ring';
import { useDispatch} from 'react-redux';
import {getUsers} from '@/controllers/forum-topic-controller';
import {Loading} from "@/features/forum/components/loading";

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const Friends: FC = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response: any = await getUsers();

            if (response.data !== undefined && response.status === 200) {
                setList(response.data);
            }
        }

        fetchData();
    }, []);

    {
        if (list.length > 0) {
            return (
                <div className="friends row ">
                    {list.map(({avatar, display_name}, index: number) => (
                        <Ring key={index} avatar={avatar} name={display_name}/>
                    ))}
                </div>
            )
        } else {
            return (<Loading/>)
        }

    }
}

