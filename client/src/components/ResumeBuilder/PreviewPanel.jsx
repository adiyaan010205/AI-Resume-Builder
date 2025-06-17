import React from 'react';
import Button from '../UI/Button';

const PreviewPanel = ({ resumeData, template, onFullscreen }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <aside className="preview">
      <div className="preview__header">
        <h3>Live Preview</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onFullscreen}
          id="fullscreenBtn"
        >
          ⛶ Fullscreen
        </Button>
      </div>
      <div className="preview__content" id="resumePreview">
        <div className={`resume-template theme-${template}`} id="resumeTemplate">
          <div className="resume-header">
            <h1 className="resume-name">{resumeData.fullName}</h1>
            <div className="resume-contact">
              {resumeData.email && <span>✉️ {resumeData.email}</span>}
              {resumeData.phone && <span>📱 {resumeData.phone}</span>}
              {resumeData.location && <span>📍 {resumeData.location}</span>}
              {resumeData.linkedin && <span>🔗 {resumeData.linkedin}</span>}
              {resumeData.website && <span>🌐 {resumeData.website}</span>}
            </div>
          </div>

          {resumeData.summary && (
            <div className="resume-section">
              <h2 className="resume-section-title">Professional Summary</h2>
              <p className="resume-summary">{resumeData.summary}</p>
            </div>
          )}

          {resumeData.experience?.length > 0 && (
            <div className="resume-section">
              <h2 className="resume-section-title">Experience</h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="resume-experience-item">
                  <div className="resume-item-header">
                    <div>
                      <h3 className="resume-item-title">{exp.title}</h3>
                      <div className="resume-item-company">{exp.company}</div>
                    </div>
                    <div className="resume-item-date">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="resume-item-location">{exp.location}</div>
                  <div className="resume-description">
                    <ul>
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {resumeData.education?.length > 0 && (
            <div className="resume-section">
              <h2 className="resume-section-title">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="resume-education-item">
                  <div className="resume-item-header">
                    <div>
                      <h3 className="resume-item-title">{edu.degree}</h3>
                      <div className="resume-item-company">{edu.school}</div>
                    </div>
                    <div className="resume-item-date">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                  <div className="resume-item-location">{edu.location}</div>
                </div>
              ))}
            </div>
          )}

          {(resumeData.technicalSkills?.length > 0 || resumeData.softSkills?.length > 0) && (
            <div className="resume-section">
              <h2 className="resume-section-title">Skills</h2>
              <div className="resume-skills">
                {resumeData.technicalSkills?.map((skill, index) => (
                  <span key={index} className="resume-skill">
                    {skill}
                  </span>
                ))}
                {resumeData.softSkills?.map((skill, index) => (
                  <span key={index} className="resume-skill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {resumeData.projects?.length > 0 && (
            <div className="resume-section">
              <h2 className="resume-section-title">Projects</h2>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="resume-project-item">
                  <div className="resume-item-header">
                    <div>
                      <h3 className="resume-item-title">{project.name}</h3>
                      {project.url && (
                        <div className="resume-item-company">
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            {project.url}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="resume-item-date">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </div>
                  </div>
                  <div className="resume-description">
                    <p>{project.description}</p>
                    {project.technologies?.length > 0 && (
                      <div className="resume-skills">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="resume-skill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default PreviewPanel; 