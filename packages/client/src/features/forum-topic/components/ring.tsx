import './topic-comment.scss';
/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */

export const Ring = ({ avatar, name }: any) => {
  return (
    <div className="ring column">
      <div className="circle">
        <img className="img-ring" src={avatar} key={name} alt={'avatar'} />
      </div>
      <h6>{name}</h6>
    </div>
  );
};
