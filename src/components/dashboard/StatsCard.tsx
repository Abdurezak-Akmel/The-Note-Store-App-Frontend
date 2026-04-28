import React from 'react';
import './StatsCard.css';

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon?: React.ReactNode;
}


const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  trend,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`dashboard-stats-card ${className}`} {...props}>
      <div className="dashboard-stats-card__content">
        <span className="dashboard-stats-card__label">{label}</span>
        <div className="dashboard-stats-card__value-container">
          <span className="dashboard-stats-card__value">{value}</span>
          {trend && (
            <span className={`dashboard-stats-card__trend ${trend.isUp ? 'is-up' : 'is-down'}`}>
              {trend.isUp ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
      </div>
      {icon && <div className="dashboard-stats-card__icon-container">{icon}</div>}
    </div>
  );
};

export default StatsCard;
