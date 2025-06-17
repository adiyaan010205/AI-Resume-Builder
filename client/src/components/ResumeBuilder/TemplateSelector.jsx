import React from 'react';
import { templates } from '../../../shared/constants/templates';

const TemplateSelector = ({ activeTemplate, onTemplateChange }) => {
  return (
    <div className="sidebar__section">
      <h4 className="sidebar__section-title">Templates</h4>
      <select
        className="form-control"
        value={activeTemplate}
        onChange={(e) => onTemplateChange(e.target.value)}
        id="templateSelector"
      >
        {Object.values(templates).map((template) => (
          <option key={template.id} value={template.id}>
            {template.name} - {template.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector; 