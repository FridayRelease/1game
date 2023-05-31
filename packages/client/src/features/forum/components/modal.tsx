import './modal.scss';
import {useState} from "react";
import {useSelector} from "react-redux";
import {ForumSelectors} from "@/store/slices/forum-slice";

export const Modal= ()=>{
    //const setShow = props.setShow();
    const [text, setText] = useState('')
    //доделать!!!
    const id = 2;//useSelector(ForumSelectors.friends);
    //доделать
    async function createForum(used_id:number, text:string) {
        //setShow(false);
    }

    return(
        <div className='modal'>
            <div className='modal-title'>
                Введите название темы
            </div>
            <form className='modal-form'>
                <input name='create-forum' className='input-create-forum' inputMode="text"/>

            </form>
            <div className='modal-footer'>
                <button type='button' className='modal-button' onClick={()=> createForum(id, text)}>Создать</button>
            </div>

        </div>
    );
}