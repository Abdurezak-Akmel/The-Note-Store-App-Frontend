import React from 'react';
import './Checkbox.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  error, 
  id, 
  className = '', 
  ...props 
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`ui-checkbox-container ${className}`}>
      <label className="ui-checkbox-label" htmlFor={checkboxId}>
        <input 
          type="checkbox" 
          id={checkboxId} 
          className="ui-checkbox-input" 
          {...props} 
        />
        <span className="ui-checkbox-box">
          <svg
            className="ui-checkbox-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        {label && <span className="ui-checkbox-text">{label}</span>}
      </label>
      {error && <p className="ui-checkbox-error">{error}</p>}
    </div>
  );
};

export default Checkbox;
