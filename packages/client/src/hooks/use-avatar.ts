import axios from 'axios';
import { useEffect, useState } from 'react';

const useAvatar = (url: string | null) => {
  const [avatar, setAvatar] = useState<string | null>(null);

  // нужно переписать с использованием апи
  const src = `${import.meta.env.VITE_BASE_API}/resources${url}`;

  useEffect(() => {
    if (url) {
      (async () => {
        const blobAvatar = await axios.get(src, { responseType: 'blob', withCredentials: true });
        const avatar = URL.createObjectURL(blobAvatar.data);

        setAvatar(avatar);
      })();
    }
  }, []);

  return { avatar };
};

export default useAvatar;
