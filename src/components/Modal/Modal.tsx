import React, { PropsWithChildren, useEffect, useRef } from 'react';

import { useTranslationContext } from '../../context/TranslationContext';

export type ModalProps = {
  /** Callback handler for closing of modal. */
  onClose: () => void;
  /** If true, modal is opened or visible. */
  open: boolean;
};

export const Modal: React.FC<PropsWithChildren<ModalProps>> = (props) => {
  const { children, onClose, open } = props;

  const { t } = useTranslationContext();

  const innerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target instanceof Node &&
      !innerRef.current?.contains(event.target) &&
      onClose
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (!open) return () => null;

    const handleEscKey: EventListener = (event) => {
      if (event instanceof KeyboardEvent && event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keyPress', handleEscKey);
    return () => document.removeEventListener('keyPress', handleEscKey);
  }, [onClose, open]);

  const openClasses = open
    ? 'str-chat__modal--open'
    : 'str-chat__modal--closed';

  return (
    <div className={`str-chat__modal ${openClasses}`} onClick={handleClick}>
      <div className='str-chat__modal__close-button'>
        {t('Close')}
        <svg height='10' width='10' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M9.916 1.027L8.973.084 5 4.058 1.027.084l-.943.943L4.058 5 .084 8.973l.943.943L5 5.942l3.973 3.974.943-.943L5.942 5z'
            fillRule='evenodd'
          />
        </svg>
      </div>
      <div className='str-chat__modal__inner' ref={innerRef}>
        {children}
      </div>
    </div>
  );
};