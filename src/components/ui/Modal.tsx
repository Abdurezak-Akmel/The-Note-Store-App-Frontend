import React, { useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="ui-modal-overlay" onClick={onClose}>
      <div 
        className={`ui-modal ui-modal--${size}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ui-modal-header">
          {title && <h3 className="ui-modal-title">{title}</h3>}
          <button className="ui-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="ui-modal-body">
          {children}
        </div>
        {footer && <div className="ui-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
