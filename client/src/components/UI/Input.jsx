import React from 'react';

const Input = ({
  label,
  error,
  errorMessage,
  className = '',
  ...props
}) => {
  const classes = [
    'form-control',
    error ? 'error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input className={classes} {...props} />
      {error && errorMessage && (
        <span className="error-message">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input; 