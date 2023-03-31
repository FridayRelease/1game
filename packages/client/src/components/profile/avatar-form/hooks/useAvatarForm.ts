import { useState, useEffect, useRef, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { LoadingSelectors } from '@/store/slices/loading-slice';
import { errorActions, errorSelectors } from '@/store/slices/error-slice';
import { updateAvatar } from '@/controllers/user-controllers';

const ESCAPE_KEY = 'Escape';
const MIME_TYPE = 'image/jpeg';

const useAvatarForm = (onCloseForm: () => void) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(LoadingSelectors.all);
  const { error } = useSelector(errorSelectors.all);

  const [uploaded, setUploaded] = useState(false);
  const [pathName, setPathName] = useState<string | null>(null);

  const avatarEditorRef = useRef<AvatarEditor>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isError = !!error.title.length;

  useEffect(() => {
    document.onkeydown = (evt: KeyboardEvent) => {
      if (evt.code === ESCAPE_KEY) {
        onCloseForm();
      }
    };

    return () => {
      document.onkeydown = null;
    };
  }, [onCloseForm]);

  useEffect(() => {
    if (pathName) {
      setUploaded(false);
      dispatch(errorActions.resetError());
    }
  }, [pathName]);

  useEffect(() => {
    if (uploaded) {
      setPathName(null);
    }
  }, [uploaded]);

  useEffect(() => {
    if (!isLoading && pathName && !isError) {
      setUploaded(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (uploaded && formRef.current) {
      formRef.current.reset();
    }
  }, [uploaded]);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (!avatarEditorRef.current) return;

    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    canvas.toBlob(async blob => {
      if (blob) {
        const file = new File([blob], 'avatar.jpeg', { type: MIME_TYPE });

        await updateAvatar(file, dispatch);
      }
    }, MIME_TYPE);
  };

  const onInput = (evt: FormEvent) => {
    const { files } = evt.target as HTMLInputElement;

    if (files) {
      if (files[0]) {
        setPathName(URL.createObjectURL(files[0]));
      }
    }
  };

  return {
    avatarEditorRef,
    formRef,
    isError,
    isLoading,
    uploaded,
    pathName,
    onSubmit,
    onInput,
  };
};

export default useAvatarForm;
