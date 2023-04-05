import { FC } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Menu from '../menu';
import { MenuState, MenuType } from '../menu/menu.interface';
import IAvatarForm from './avatar-form.interface';
import CloseButton from './close-button/close-button';
import useAvatarForm from './hooks/useAvatarForm';
import './avatar-form.scss';

const AVATAR_SIZE = 63;

const AvatarForm: FC<IAvatarForm> = ({ onClose }) => {
  const { avatarEditorRef, formRef, isError, isLoading, uploaded, pathName, onSubmit, onInput } =
    useAvatarForm(onClose);

  const buttonStateWithoutError = pathName ? MenuState.SUCCESS : MenuState.DEFAULT;
  const buttonState = isError ? MenuState.ERROR : buttonStateWithoutError;

  return (
    <div className="avatar-popup-wrapper">
      <div className="avatar-popup__bg" onClick={onClose} />
      <div className="avatar-popup">
        <form ref={formRef} className="avatar-popup__form" onSubmit={onSubmit}>
          <Menu
            className="avatar-popup__menu"
            title="Поменять"
            state={buttonState}
            type={MenuType.SUBMIT}
            disabled={!pathName || isLoading}>
            <div className="avatar-popup__menu-content">
              <p className="avatar-popup__title">
                {!uploaded && !isLoading && 'Загрузите файл'}
                {uploaded && 'Файл загружен'}
                {isLoading && 'Загрузка...'}
              </p>
              {isError && pathName && <p className="avatar-popup__upload-error">Ошибка, попробуйте ещё раз</p>}

              <label>
                Выбрать файл на компьютере
                <input type="file" onInput={onInput} accept="image/*" />
              </label>

              {pathName && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  className="avatar-popup__editor"
                  image={pathName}
                  width={AVATAR_SIZE * 2}
                  height={AVATAR_SIZE * 2}
                  scale={2}
                  color={[255, 255, 255, 0.7]}
                  borderRadius={AVATAR_SIZE}
                />
              )}

              {isError && !pathName && <span className="avatar-popup__error">Нужно выбрать файл</span>}
              <CloseButton className="avatar-popup__close-button" onClick={onClose} />
            </div>
          </Menu>
        </form>
      </div>
    </div>
  );
};

export default AvatarForm;
