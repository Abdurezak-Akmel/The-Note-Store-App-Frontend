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
        <span className="landing-hero__eyebrow">Notes, tasks, and ideas in one calm workspace</span>
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
      <div className="landing-hero__image-container" aria-hidden="true">
        <div className="landing-hero__mockup">
          <div className="landing-hero__mockup-topbar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="landing-hero__mockup-body">
            <div className="landing-hero__mockup-sidebar">
              {image && <img src={image} alt="" className="landing-hero__brand-image" />}
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="landing-hero__mockup-notes">
              <div className="landing-hero__mock-note is-yellow">
                <strong>Course plan</strong>
                <span>React hooks, API calls, deployment</span>
              </div>
              <div className="landing-hero__mock-note is-teal">
                <strong>Project ideas</strong>
                <span>Polish the dashboard and ship confidently</span>
              </div>
              <div className="landing-hero__mock-note is-coral">
                <strong>Today</strong>
                <span>Capture, sort, review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
