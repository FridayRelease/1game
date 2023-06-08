import { ModalProps } from './types';
import { cn } from '@/utils/cn';
import Button from '@/components/button/button';
import './modal.scss';

const Modal = ({ handleClose, isShow, children }: ModalProps) => {
  const defineClassName = isShow ? 'display-block' : 'display-none';

  return (
    <div className={cn('modal', defineClassName)}>
      <section className="modal__main">
        <div className="modal__button-wrapper">
          <Button type="button" view="secondary" size="small" className="modal__button" onClick={handleClose}>
            закрыть
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;
