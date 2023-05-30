import {IComment} from "@/api/types";

interface CommentType{
    children:IComment[]
}

export const Comments = ({children}:CommentType) => {

    return (
        <div className="comments">
            {children.map(comment =>
                <div key={comment.id} className="comment">
                    <span>{comment.message}</span>
                    {comment.comments && <Comments children={comment.comments}/>}
                </div>
            )}
        </div>
    );
}