import { IconCrownProps } from './types';

const IconCrown = ({ fillColor }: IconCrownProps) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        // eslint-disable-next-line max-len
        d="M4.72705 40.1818H47.2725V44.9091H4.72705V40.1818ZM9.45432 14.1818V16.5455H11.818V18.9091H14.1816V16.5455H16.5452V14.1818H18.9089V11.8182H21.2725V9.45455H23.6361V7.09091H28.3634V9.45455H30.7271V11.8182H33.0907V14.1818H35.4543V16.5455H37.818V18.9091H40.1816V16.5455H42.5452V14.1818H44.9089V11.8182H47.2725V37.8182H4.72705V11.8182H7.09069V14.1818H9.45432ZM16.5452 33.0909H42.5452V23.6364H35.4543V21.2727H33.0907V18.9091H30.7271V16.5455H28.3634V14.1818H23.6361V16.5455H21.2725V18.9091H18.9089V21.2727H16.5452V23.6364H9.45432V33.0909H16.5452Z"
        fill={fillColor ? fillColor : 'var(--main-bg-alert)'}
      />
    </svg>
  );
};

export default IconCrown;
