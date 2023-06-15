import './topic-comment.scss';

/**
 Компонент NoComments для Страницы форума
 @category component
 */
export const NoComments = () => {
    return (
        <div className="no-comments column">

            <label className="string">Чат недавно создан</label><br/>
            <label className="string">Здесь пока нет ни одного сообщения</label><br/>
            <label className="string">Вы можете быть первым, кто что-нибудь напишет</label><br/>

        </div>
    );
};