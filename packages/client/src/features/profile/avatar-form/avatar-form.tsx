import { FC, useRef, useState, useEffect, FormEvent } from 'react';
import Menu from '../menu';
import { MenuState, MenuType } from '../menu/menu.interface';
import IAvatarForm from './avatar-form.interface';
import { cn } from '@/utils/cn';
import './avatar-form.scss';

const INPUT_NAME = 'avatar-file';
const INPUT_KEY = 'Escape';

const AvatarForm: FC<IAvatarForm> = ({ onClose }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [pathName, setPathName] = useState<string | null>(null);

  useEffect(() => {
    document.onkeydown = (evt: KeyboardEvent) => {
      if (evt.code === INPUT_KEY) {
        onClose();
      }
    };

    return () => {
      document.onkeydown = null;
    };
  }, [onClose]);

  useEffect(() => {
    if (pathName) {
      setIsError(false);
      setUploaded(false);
    }
  }, [pathName]);

  useEffect(() => {
    if (uploaded) {
      setIsLoading(false);
    }
  }, [uploaded]);

  useEffect(() => {
    if (isLoading) {
      setIsError(false);
    }
  }, [isLoading]);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (evt: FormEvent) => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const fileData = formData.get(INPUT_NAME) as FormDataEntryValue;

    if (fileData instanceof File) {
      evt.preventDefault();

      setIsLoading(true);

      const { name: fileName } = fileData;
      const isError = !fileName.length;

      setIsError(isError);

      if (!isError) {
        // здесь будет запрос

        setUploaded(true);
      }
    }
  };

  const onInput = (evt: FormEvent) => {
    const { files } = evt.target as HTMLInputElement;

    if (files) {
      const fileName = files[0]?.name;

      if (fileName) {
        setPathName(fileName);
      }
    }
  };

  const buttonStateWithoutError = pathName
    ? MenuState.SUCCESS
    : MenuState.DEFAULT;

  const buttonState = isError ? MenuState.ERROR : buttonStateWithoutError;

  return (
    <div className="avatar-popup-wrapper">
      <div className="avatar-popup__bg" onClick={onClose} />
      <div className="avatar-popup">
        <Menu
          className="avatar-popup__menu"
          title="Поменять"
          state={buttonState}
          type={MenuType.SUBMIT}
          disabled={!pathName || isError}>
          <>
            <p className="avatar-popup__title">
              {uploaded ? 'Файл загружен' : 'Загрузите файл'}
            </p>
            {isError && pathName && (
              <p className="avatar-popup__upload-error">
                Ошибка, попробуйте ещё раз
              </p>
            )}
            {isLoading && <p className="avatar-popup__loading">Загрузка...</p>}

            <form
              className="avatar-popup__form"
              ref={formRef}
              onSubmit={onSubmit}>
              <label className={cn({ 'avatar-popup__path': !!pathName })}>
                {pathName ?? 'Выбрать файл на компьютере'}
                <input type="file" name={INPUT_NAME} onInput={onInput} accept="image/*" />
              </label>

              {isError && !pathName && (
                <span className="avatar-popup__error">Нужно выбрать файл</span>
              )}
            </form>
          </>
        </Menu>
      </div>
    </div>
  );
};

export default AvatarForm;
