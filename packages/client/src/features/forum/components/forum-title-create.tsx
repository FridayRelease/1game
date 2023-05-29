import {FC} from "react";
import { ReactComponent as PlusInRing } from '@/assets/images/icons/create.svg';
import ButtonNew from "@/components/button-new/button-new";
import '../forum.scss';

/**
 Title Страницы форума
 @category component
 */
export const TitleCreateForum: FC = () => {

    function createTopic() {
        console.log('Функция CreateChat будет реализована, когда будет API');
        alert('Функция CreateChat будет реализована, когда будет API');
    }

    const children = (
        <div className="forum-create-module">
            <PlusInRing className="ring" fill="var(--base-bg-white)" />
            <label>Создать</label>{' '}
        </div>
    );

    return (
        <div className="forum-title-create row ">
            <div className="forum-title left">
                <label className="red">Ф</label>
                <label className="white">ОРУМ</label>
            </div>
            <ButtonNew className="forum-button right" children={children} onClick={createTopic} />
        </div>
    );
}