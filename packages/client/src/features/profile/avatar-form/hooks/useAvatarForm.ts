import { useState, useEffect, useRef, FormEvent } from 'react';
import AvatarEditor from 'react-avatar-editor';

const ESCAPE_KEY = 'Escape';
const MIME_TYPE = 'image/jpeg';

const useAvatarForm = (onCloseForm: () => void) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [pathName, setPathName] = useState<string | null>(null);

  const avatarEditorRef = useRef<AvatarEditor>(null);

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
      setIsError(false);
      setUploaded(false);
    }
  }, [pathName]);

  useEffect(() => {
    if (uploaded) {
      setIsLoading(false);
      setPathName(null);
    }
  }, [uploaded]);

  useEffect(() => {
    if (isLoading) {
      setIsError(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setIsLoading(false);
    }
  }, [isError]);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (!avatarEditorRef.current) return;

    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    canvas.toBlob(async blob => {
      if (blob) {
        const file = new File([blob], 'avatar.jpeg', { type: MIME_TYPE });
        console.log(file);

        setIsLoading(true);

        // здесь будет запрос

        await new Promise(resolve => setTimeout(resolve, 2000));

        // setUploaded(true);
        // (evt.target as HTMLFormElement).reset();

        setIsError(true);
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
    isError,
    isLoading,
    uploaded,
    pathName,
    onSubmit,
    onInput,
  };
};

export default useAvatarForm;
