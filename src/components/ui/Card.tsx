import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  variant?: 'elevated' | 'flat' | 'outline';
  padding?: 'sm' | 'md' | 'lg';
}


const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  variant = 'elevated',
  padding = 'md',
  ...props
}) => {
  return (
    <div
      className={`ui-card ui-card--${variant} ui-card--padding-${padding} ${props.onClick ? 'ui-card--clickable' : ''} ${className}`}
      {...props}
    >

      {title && <h3 className="ui-card-title">{title}</h3>}
      <div className="ui-card-content">{children}</div>
    </div>
  );
};

export default Card;
