import axios from 'axios';
import { useEffect, useState } from 'react';

const useAvatar = (url: string | null) => {
  const [avatar, setAvatar] = useState<string | null>(null);

  // нужно переписать с использованием апи
  const src = `http://localhost:3001/api/v2/resources${url}`;

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
