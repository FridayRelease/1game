interface IAvatar {
  url?: string;
  className?: string;
  editable?: boolean;
  children?: string;
  onClick?: () => void;
}

export default IAvatar;
