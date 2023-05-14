import { useState, useEffect } from 'react';
import Logo from '@/assets/images/logotype.png';

import { LogotypeProps } from './types';

const Logotype = ({ className, alt = 'Battle city' }: LogotypeProps) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setShowLogo(true);
  }, [showLogo]);

  if (showLogo) {
    return <img src={Logo} className={className} alt={alt} />;
  }
  return null;
};
export default Logotype;
