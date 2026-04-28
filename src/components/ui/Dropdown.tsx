import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'danger';
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

const Dropdown: React.FC<DropdownProps> = ({ 
  trigger, 
  items, 
  align = 'left' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="ui-dropdown" ref={dropdownRef}>
      <div 
        className="ui-dropdown-trigger" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>
      {isOpen && (
        <div className={`ui-dropdown-menu ui-dropdown--${align}`}>
          {items.map((item, index) => (
            <button
              key={index}
              className={`ui-dropdown-item ui-dropdown-item--${item.variant || 'default'}`}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
            >
              {item.icon && <span className="ui-dropdown-item-icon">{item.icon}</span>}
              <span className="ui-dropdown-item-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
