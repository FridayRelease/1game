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
        subject:text,
        user_id:user.info!.id,
        created_at:today.toLocaleDateString("en-US"),
        updated_at:today.toLocaleDateString("en-US"),
      }
    const dispatch = useDispatch()
    const onSubmit  = (e:FormEvent) =>  {
        e.preventDefault();
        console.log('datas for create new topic = ', data)
        const result = addTopicToServer(data);
        //console.log('result of add topic to Server', result)
             //dispatch(ForumActions.setTopicsFromServerToStore(data));

    };
    function update(event:ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    return(
        <div className={'create-topic'}>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="InputName">Создать Тему:</label>
                    <input id="InputName" type="text" value={text} defaultValue={'Привет !'} onChange={event =>update(event) } />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
}