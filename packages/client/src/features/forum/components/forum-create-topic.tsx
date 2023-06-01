import {ChangeEvent, ChangeEventHandler, FormEvent, useState} from "react";
import {ITopicCreate} from "@/api/types";
import {addTopicToServer} from "@/controllers/forum-topic-controller";
import {useDispatch, useSelector} from "react-redux";
import {userSelectors} from "@/features/authentication";

interface FormType{
    newTopic:ITopicCreate
}

export const CreateTopic = () =>{
    const [text, setText] = useState('');
    const user = useSelector(userSelectors.user)
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const data:ITopicCreate = {
        //id:5,
        subject:text,
        user_id:user.info!.id,
        created_at:today.toLocaleDateString("en-US"),
        updated_at:today.toLocaleDateString("en-US"),
      }
      console.log('data before = ', data)
    const dispatch = useDispatch()
    const onSubmit  = (e:FormEvent, data:ITopicCreate) =>  {//
        e.preventDefault();
        console.log('datas for create new topic = ', data)
        addToServer(data);
    };

    async function addToServer(data:ITopicCreate) {
        await addTopicToServer(data).then(res => console.log('res = ', res))
    }
    function update(event:ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    return(
        <div className={'create-topic'}>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="InputName">Создать Тему:</label>
                    <input id="InputName" type="text" value={text}  onChange={event =>update(event) } />
                </div>

            </form>
            <button type="submit">Создать</button>
        </div>

    );
}