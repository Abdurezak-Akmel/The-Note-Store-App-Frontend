import React from 'react';
import './Avatar.css';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  shape = 'circle',
  className = '',
}) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div 
      className={`ui-avatar ui-avatar--${size} ui-avatar--${shape} ${className}`}
      title={name}
    >
      {src ? (
        <img src={src} alt={name} className="ui-avatar-img" />
      ) : (
        <div className="ui-avatar-initials">{initials || '?'}</div>
      )}
    </div>
  );
};

export default Avatar;
