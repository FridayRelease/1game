import './topic-comment.scss';
import {FC, useEffect, useState} from "react";
import {userFullInfo} from "@/controllers/user-controllers";
import foto from "@/mock/currentUser.jpg";

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const HeaderUserRight: FC = () => {

    const [name, setName] = useState<any>('');
    const [avatar, setAvatar] = useState<any>('');
    useEffect(() => {

        (async () => {
            const res = await userFullInfo();
            //console.log('user = ', res)
            const name1 = res.display_name!==null ? res.display_name : res.first_name
            const avatar1 = res.avatar!==null ? 'https://ya-praktikum.tech/api/v2/resources/'+res.avatar : foto
            setName(name1);
            setAvatar(avatar1);
            //console.warn(res);
        })();
    }, []);

    return (
        <div className="header-user row ">

            <div className="current-user-img">
                <img className="current-user-foto" src={avatar} alt="Пользователь"/>
            </div>
            <label className="label-user">{name}</label>

        </div>
    );
};