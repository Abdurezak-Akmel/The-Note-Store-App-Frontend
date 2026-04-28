import React from 'react';
import './FormGroup.css';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  error,
  children,
  hint,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`form-group ${error ? 'has-error' : ''} ${className}`} {...props}>

      {label && (
        <label className="form-group__label">
          {label}
          {required && <span className="form-group__required">*</span>}
        </label>
      )}
      <div className="form-group__content">
        {children}
      </div>
      {error && <p className="form-group__error-msg">{error}</p>}
      {hint && !error && <p className="form-group__hint-msg">{hint}</p>}
    </div>
  );
};

export default FormGroup;
