import './topic-comment.scss';
/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */

export const Ring= ({avatar,  name }: any) => {
    return (
        <div className='ring column'>
            <div className="circle">
                <img src={avatar} key={name}/>
            </div>
            <h6>{name}</h6>
       </div>
    );
}