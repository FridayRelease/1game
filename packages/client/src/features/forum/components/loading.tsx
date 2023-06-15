import '../forum.scss';

/**
 Компонент Loading для Страницы форума
 @category component
 */
export const Loading = () => {
    return (
        <div className="loading column">

                <label className="string">Пожалуйста, подождите...</label><br/>
                <label className="string">Идет загрузка</label>

        </div>
    );
};