import {ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState} from "react";
import {ITopicCreate} from "@/api/types";
import {addTopicToServer} from "@/controllers/forum-topic-controller";
import {useDispatch, useSelector} from "react-redux";
import {userSelectors} from "@/features/authentication";
import {ForumActions} from "@/store/slices/forum-slice";

interface FormType{
    newTopic:ITopicCreate
}

export const CreateTopic = () =>{
    const [text, setText] = useState('');
    const user = useSelector(userSelectors.user)
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const data:ITopicCreate = {
        subject:text,
        user_id:user.info!.id,

      }
      console.log('data before = ', data)
    const dispatch = useDispatch()
    const onSubmit  = (e:FormEvent) =>  {//
        e.preventDefault();
        console.log('e.target = ', e.target)
        //console.log('datas for create new topic = ', data)
        addToServer(data);

    };

    async function addToServer(data:ITopicCreate) {
        await addTopicToServer(data).then(res => console.log('res = ', res))
    }


    return(
        <div className={'create-topic'}>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="InputName">Создать Тему:</label>
                    <input id="InputName" type="text" value={text}  onChange={(event) => setText(event.target.value) } />
                </div>

            </form>
            <button type="submit">Создать</button>
        </div>

    );
}