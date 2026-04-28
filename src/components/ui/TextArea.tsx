import React from 'react';
import './TextArea.css';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className={`ui-textarea-container ${className}`}>
      {label && <label className="ui-label" htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        className={`ui-textarea ${error ? 'ui-textarea--error' : ''}`}
        {...props}
      />
      {error && <p className="ui-textarea-error-msg">{error}</p>}
    </div>
  );
};

export default TextArea;
