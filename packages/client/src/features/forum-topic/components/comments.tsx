import {IComment} from "@/api/types";

interface CommentType{
    children:IComment[]

}

export const Comments = ({children}:CommentType) => {
    const space=10

    return (
        <div className="comments border-red" style={{marginLeft: `${space}em`}}>
            {children.map(comment =>
                <div key={comment.id} className="comment border-yellow" >
                    <span>{comment.message}</span>
                    {comment.comments && <Comments key={comment.message} children={comment.comments}/>}
                </div>
            )}
        </div>
    );
}