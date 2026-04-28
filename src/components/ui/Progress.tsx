import React from 'react';
import './Progress.css';

interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`ui-progress ui-progress--${size}`}>
      <div className="ui-progress-bar-container">
        <div 
          className={`ui-progress-bar ui-progress-bar--${variant}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {showLabel && (
        <span className="ui-progress-label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

export default Progress;
