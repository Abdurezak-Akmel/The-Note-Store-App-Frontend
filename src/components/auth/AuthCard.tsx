import React from 'react';
import './AuthCard.css';
import { Card } from '../ui';

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
}


const AuthCard: React.FC<AuthCardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  ...props
}) => {
  return (
    <div className={`auth-card-wrapper ${className}`} {...props}>
      <Card variant="elevated" padding="lg" className="auth-card" style={props.style}>
        <div className="auth-card__header">
          <h2 className="auth-card__title">{title}</h2>
          {subtitle && <p className="auth-card__subtitle">{subtitle}</p>}
        </div>
        <div className="auth-card__body">
          {children}
        </div>
        {footer && (
          <div className="auth-card__footer">
            {footer}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AuthCard;
