import React from 'react';
import './Hero.css';
import { Button } from '../ui';

interface HeroProps {
  title: string | React.ReactNode;
  subtitle: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  image?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  image,
  className = '',
}) => {
  return (
    <div className={`landing-hero ${className}`}>
      <div className="landing-hero__content">
        <h1 className="landing-hero__title">{title}</h1>
        <p className="landing-hero__subtitle">{subtitle}</p>
        <div className="landing-hero__actions">
          {primaryAction && (
            <Button size="lg" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button size="lg" variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
      {image && (
        <div className="landing-hero__image-container">
          <img src={image} alt="Hero" className="landing-hero__image" />
        </div>
      )}
    </div>
  );
};

export default Hero;
