enum Icons {
  Profile = 'Profile',
  Trophy = 'Trophy',
  Forum = 'Forum',
  Logout = 'Logout',
}

interface IconType {
  type: string;
  className?: string;
  fill?: string;
  stroke?: string;
}

type IconsComponentType = {
  [key: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

export { type IconType, Icons, type IconsComponentType };
