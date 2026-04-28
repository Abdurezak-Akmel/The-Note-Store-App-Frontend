import React from 'react';
import './Switch.css';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ 
  label, 
  id, 
  className = '', 
  ...props 
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`ui-switch-container ${className}`}>
      <label className="ui-switch-label" htmlFor={switchId}>
        <input 
          type="checkbox" 
          id={switchId} 
          className="ui-switch-input" 
          {...props} 
        />
        <div className="ui-switch-toggle">
          <div className="ui-switch-thumb"></div>
        </div>
        {label && <span className="ui-switch-text">{label}</span>}
      </label>
    </div>
  );
};

export default Switch;
