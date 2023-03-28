import './error.scss';
import { ErrorProps } from './types';

const Error = ({ status, text, children }: ErrorProps) => (
  <div id="error-page" className="error-page">
    <div className="error-page__wrapper">
      <h1 className="error-page__status">{status}</h1>
      <p className="error-page__text">{text}</p>
      {children}
    </div>
  </div>
);

export default Error;
