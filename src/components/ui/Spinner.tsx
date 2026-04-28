import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  variant = 'primary',
  className = '' 
}) => {
  return (
    <div 
      className={`ui-spinner ui-spinner--${size} ui-spinner--${variant} ${className}`}
      role="status"
    >
      <span className="ui-spinner-sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
