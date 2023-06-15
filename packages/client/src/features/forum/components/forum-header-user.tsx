import { FC, useEffect, useState } from 'react';
import { userFullInfo } from '@/controllers/user-controllers';
import '../forum.scss';
import {URL_RESOURCES} from "@/constant/url_resources";
/**
 Header Страницы форума
 @category component
 */
export const HeaderUserForum: FC = () => {
  const [name, setName] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  useEffect(() => {
    (async () => {
      const res = await userFullInfo();

      const name1 = res.display_name !== null ? res.display_name : res.first_name;
      const avatar1 = res.avatar !== null ? `${URL_RESOURCES}` + `${res.avatar}` : '';
      setName(name1);
      setAvatar(avatar1);

    })();
  }, []);

  return (
    <div className="forum-current-user row ">
      <div className="current-user-img">
        <img className="current-user-foto" src={avatar} alt="User" />
      </div>
      <label className="label-user">{name}</label>
    </div>
  );
};
