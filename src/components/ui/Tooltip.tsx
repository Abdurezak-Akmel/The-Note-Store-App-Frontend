import React, { useState } from 'react';
import './Tooltip.css';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    if (timer) clearTimeout(timer);
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimer(timeout);
  };

  const hideTooltip = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="ui-tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div className={`ui-tooltip ui-tooltip--${position}`} role="tooltip">
          {content}
          <div className="ui-tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
