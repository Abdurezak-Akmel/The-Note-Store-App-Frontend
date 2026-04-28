import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className={`ui-input-container ${className}`}>
      {label && <label className="ui-label" htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={`ui-input ${error ? 'ui-input--error' : ''}`}
        {...props}
      />
      {error && <p className="ui-input-error-msg">{error}</p>}
    </div>
  );
};

export default Input;
