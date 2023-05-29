//import './topic-comment.scss';
import {FC, useEffect, useState} from "react";
import LeaderboardItem from "@/components/leaderboard-list/leaderboard-item";
import {Ring} from "@/features/forum-topic/components/ring";
import avatar from "@/components/avatar";
import {IQuery} from "@/api/types";
import {getLeaderboardDatas} from "@/controllers/lider-controller";
import {Users} from "@/mock/mockUsers";

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const Friends: FC = () => {
    /*
    const [list, setData] = useState<any>([]);

    useEffect(() => {
          (async () => {
            const res = Users;

            setData(res);
            console.warn(res);
        })();
    }, []);
    */
    const list = Users;
    //console.log('list = ', list)
    return (
        <div className="friends row ">
            {list.map(( li : any, index: number) => (
                <Ring key={index} avatar={li.avatar} name={li.display_name}/>

            ))}
        </div>
    );
};