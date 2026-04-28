import React from 'react';
import './Section.css';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'white' | 'light' | 'dark' | 'brand';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}


const Section: React.FC<SectionProps> = ({
  children,
  variant = 'white',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <section 
      className={`layout-section layout-section--${variant} layout-section--${size} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
