import { ReactComponent as IconProfile } from '@/assets/images/icons/profile.svg';
import { ReactComponent as IconTrophy } from '@/assets/images/icons/trophy.svg';
import { ReactComponent as IconForum } from '@/assets/images/icons/forum.svg';
import { ReactComponent as IconLogout } from '@/assets/images/icons/logout.svg';
import { ReactComponent as IconYandex } from '@/assets/images/icons/yandex.svg';
import { ReactComponent as IconFullscreen } from '@/assets/images/icons/fullscreen-exit-2.svg';
import { IconComponentType } from '@/components/icon/types';
import { Icons } from '@/components/icon/icon';

function exhaustiveCheck(param: never) {
  console.log(`Not registered icon type: '${param}'`);
}

export const getIconComponentByType = (type: Icons) => {
  let iconComponent: IconComponentType | undefined;

  switch (type) {
    case Icons.Profile:
      iconComponent = IconProfile;
      break;
    case Icons.Trophy:
      iconComponent = IconTrophy;
      break;
    case Icons.Forum:
      iconComponent = IconForum;
      break;
    case Icons.Logout:
      iconComponent = IconLogout;
      break;
    case Icons.Yandex:
      iconComponent = IconYandex;
      break;
    case Icons.Fullscreen:
      iconComponent = IconFullscreen;
      break;
    default:
      exhaustiveCheck(type);
  }

  return iconComponent;
};
