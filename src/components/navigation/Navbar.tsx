import React, { useState } from 'react';
import './Navbar.css';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items: NavItem[];
  actions?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ 
  logo = "NoteStore", 
  items = [], 
  actions,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`nav-navbar ${className}`} {...props}>

      <div className="nav-navbar__container">
        <div className="nav-navbar__brand">
          <a href="/" className="nav-navbar__logo">{logo}</a>
        </div>
        
        <div className={`nav-navbar__menu ${isOpen ? 'is-open' : ''}`}>
          {items.map((item, idx) => (
            <a key={idx} href={item.href} className="nav-navbar__link">
              {item.label}
            </a>
          ))}
          {actions && <div className="nav-navbar__actions-mobile">{actions}</div>}
        </div>

        <div className="nav-navbar__right">
          {actions && <div className="nav-navbar__actions-desktop">{actions}</div>}
          <button 
            className="nav-navbar__toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span className="nav-navbar__toggle-bar"></span>
            <span className="nav-navbar__toggle-bar"></span>
            <span className="nav-navbar__toggle-bar"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
