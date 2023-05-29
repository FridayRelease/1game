import './topic-comment.scss';
import React, {FC} from "react";
//import './topic-comment.scss';
/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const MessageSenderBottom: FC = () => {

    function onClick() {
        console.log('Функция отправки сообщений будет реализована вместе с API');
        alert('Функция отправки сообщений будет реализована вместе с API');
    }
    return (
        <div className="forum-user-message row border-blue">
            <input placeholder="Оставить сообщение" className="forum-user-input"/>
            <button className="forum-user-button" onClick={onClick}>
                Отправить
            </button>
        </div>
    );
};