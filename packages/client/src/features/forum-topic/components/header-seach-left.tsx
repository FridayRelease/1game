import './topic-comment.scss';
import {FC} from "react";

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const HeaderSeachLeft: FC = () => {
    return (
        <div className="header-search row">
            <form className="nosubmit">
                <input className="nosubmit" type="search" placeholder="Search..."/>
            </form>
        </div>
    );
};
