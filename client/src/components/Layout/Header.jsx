import React from 'react';
import Button from '../UI/Button';

const Header = ({ onDarkModeToggle, onPrint, onSave }) => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__brand">
          <h1 className="header__title">AI Resume Builder</h1>
          <span className="header__subtitle">Powered by AI</span>
        </div>
        <div className="header__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={onDarkModeToggle}
            id="darkModeToggle"
          >
            <span id="darkModeIcon">🌙</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onPrint}
            id="printBtn"
          >
            Print
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            id="saveBtn"
          >
            Save Resume
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header; 