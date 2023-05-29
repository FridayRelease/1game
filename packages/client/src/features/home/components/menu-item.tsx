import Icon from '@/components/icon';
import { LinkType } from '@/types/link';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const MenuItem: FC<LinkType> = ({ onClick, url, icon, className, text }) => {
  if (!url) {
    return (
      <li className={className} onClick={onClick}>
        {icon && <Icon type={icon.type} className={icon.className} fill={icon.fill} stroke={icon.stroke} />}
        {text}
      </li>
    );
  }

  return (
    <Link to={url} className={className}>
      {icon && <Icon type={icon.type} className={icon.className} fill={icon.fill} stroke={icon.stroke} />}
      {text}
    </Link>
  );
};

export default MenuItem;
