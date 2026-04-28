import React from 'react';
import './Container.css';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'lg', 
  className = '',
  ...props
}) => {
  return (
    <div className={`layout-container layout-container--${size} ${className}`} {...props}>
      {children}
    </div>
  );
};


export default Container;
