interface IAvatar {
  avatar: string | null;
  className?: string;
  editable?: boolean;
  children?: string;
  onClick?: () => void;
}

export default IAvatar;
