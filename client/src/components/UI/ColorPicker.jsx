import React from 'react';

const ColorPicker = ({ themes, activeTheme, onThemeChange }) => {
  return (
    <div className="color-themes">
      {themes.map((theme) => (
        <div
          key={theme.id}
          className={`color-theme ${activeTheme === theme.id ? 'active' : ''}`}
          onClick={() => onThemeChange(theme.id)}
          data-theme={theme.id}
        >
          <div
            className="color-theme__preview"
            style={{ background: theme.color }}
          />
          <span>{theme.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ColorPicker; 