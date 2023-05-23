import { ReactComponent as IconProfile } from '@/assets/images/icons/profile.svg';
import { ReactComponent as IconTrophy } from '@/assets/images/icons/trophy.svg';
import { ReactComponent as IconForum } from '@/assets/images/icons/forum.svg';
import { ReactComponent as IconLogout } from '@/assets/images/icons/logout.svg';
import { ReactComponent as IconGamepad } from '@/assets/images/icons/dualshock.svg';
import { ReactComponent as IconGamepadD } from '@/assets/images/icons/gamepad-d.svg';
import { ReactComponent as IconGamepadActiveButton } from '@/assets/images/icons/gamepad-active-buttom.svg';
import { ReactComponent as IconGamepadDirectory } from '@/assets/images/icons/gamepad-directory.svg';
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
    case Icons.Gamepad:
      iconComponent = IconGamepad;
      break;
    case Icons.GamepadD:
      iconComponent = IconGamepadD;
      break;
    case Icons.GamepadActiveButton:
      iconComponent = IconGamepadActiveButton;
      break;
    case Icons.GamepadDirectory:
      iconComponent = IconGamepadDirectory;
      break;
    default:
      exhaustiveCheck(type);
  }

  return iconComponent;
};
