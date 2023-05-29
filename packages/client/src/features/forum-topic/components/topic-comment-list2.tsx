import {FC, useEffect, useState} from "react";
import './topic-comment.scss';
import TopicCommentItem from "@/features/forum-topic/components/topic-comment-item";
import {getCommentsByTopicId} from "@/controllers/forum-comments-controller";
import {ActiveTopicIdSelectors} from "@/store/slices/forum-slice";
import {getActiveTopicId} from "@/controllers/forum-controller";
import {queryReturn} from "@/utils/queryString";
import {mockCommentsGETByIdTopic5} from "@/mock/mockCommentsByIdTopic5";

function getComments(obj: any): any {
    let arr = new Array;
    let main = new Array();
    Object.entries(obj)
        .map(([key, value]) => {

            if (key !== 'comments') {
                console.log('arr = ',[key, value])
                arr.push([key, value])
            }
            if (key === 'comments'){
                 if (value === undefined){
                   main.push(arr);
                    console.log('main after comments= ', main)
                    arr = [];
                } else {
                    getComments(value[0])
                }
            }
        })
    return main;
}

const TopicCommentList2: FC = () => {
    //const [list, setData] = useState<any>({});
    const list = JSON.parse(mockCommentsGETByIdTopic5);
    console.log('list = ', list)
    let arr = [];
    const main = []
    useEffect(() => {
        const id = getActiveTopicId();
        (async () => {

            //const res = await getCommentsByTopicId(id);
            //console.log('res commentsById 5=',res )
            //const  = mockCommentsGETByIdTopic5
            //console.log('res = ', res)
            //setData(mockCommentsGETByIdTopic5);
            //console.warn('mockCommentsGETByIdTopic5 = ', JSON.parse(res));
            //
        })();
    }, []);

    try{
       // const comments:any[] ;//= getComments(list) ;
    } catch (e) {
        console.log('Ошибка = ', e)
    }

    return (
        <ul className="comment-list column">
            <div>
                <h1>Object will be this place</h1>
                {
                    Object.entries(list)
                    .map(([key, value]):void => {
                        if (key !== 'comments'){//
                            arr.push([key, value])
                            console.log('key, value ',key, '    ', value )
                        } else if
                        (key === 'comments'  ){
                            console.log('arr comments === null =  ', arr);
                            <TopicCommentItem comment={arr[0]}/>
                        } else if
                        (key === 'comments' && value!==undefined && value!== null){
                            //main.push(arr);
                            arr = []
                            console.log('value[0] = ', value)
                        } else{
                            console.log ('END')
                        }})


                }
            </div>
        </ul>
    );
};

export default TopicCommentList2;