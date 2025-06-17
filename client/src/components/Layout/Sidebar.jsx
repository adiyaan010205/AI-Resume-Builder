import React from 'react';
import ColorPicker from '../UI/ColorPicker';

const Sidebar = ({
  sections,
  activeSection,
  onSectionChange,
  templates,
  activeTemplate,
  onTemplateChange,
  themes,
  activeTheme,
  onThemeChange
}) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <h3 className="sidebar__title">Resume Sections</h3>
        <ul className="sidebar__menu" id="sectionMenu">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`sidebar__item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => onSectionChange(section.id)}
              data-section={section.id}
            >
              <span className="sidebar__icon">{section.icon}</span>
              {section.name}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__section">
        <h4 className="sidebar__section-title">Templates</h4>
        <select
          className="form-control"
          value={activeTemplate}
          onChange={(e) => onTemplateChange(e.target.value)}
          id="templateSelector"
        >
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name} - {template.description}
            </option>
          ))}
        </select>
      </div>

      <div className="sidebar__section">
        <h4 className="sidebar__section-title">Color Theme</h4>
        <ColorPicker
          themes={themes}
          activeTheme={activeTheme}
          onThemeChange={onThemeChange}
        />
      </div>
    </aside>
  );
};

export default Sidebar; 