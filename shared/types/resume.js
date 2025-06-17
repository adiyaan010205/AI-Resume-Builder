/**
 * @typedef {Object} PersonalInfo
 * @property {string} fullName - Full name of the person
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 * @property {string} location - City, State
 * @property {string} linkedin - LinkedIn profile URL
 * @property {string} website - Personal website/portfolio URL
 */

/**
 * @typedef {Object} Experience
 * @property {string} company - Company name
 * @property {string} position - Job position
 * @property {string} location - Work location
 * @property {string} startDate - Start date (YYYY-MM-DD)
 * @property {string} endDate - End date (YYYY-MM-DD) or 'Present'
 * @property {string[]} descriptions - List of job descriptions/achievements
 */

/**
 * @typedef {Object} Education
 * @property {string} institution - School/University name
 * @property {string} degree - Degree name
 * @property {string} field - Field of study
 * @property {string} location - Institution location
 * @property {string} startDate - Start date (YYYY-MM-DD)
 * @property {string} endDate - End date (YYYY-MM-DD) or 'Present'
 * @property {string} gpa - GPA (optional)
 */

/**
 * @typedef {Object} Project
 * @property {string} name - Project name
 * @property {string} description - Project description
 * @property {string} url - Project URL (optional)
 * @property {string[]} technologies - List of technologies used
 * @property {string} startDate - Start date (YYYY-MM-DD)
 * @property {string} endDate - End date (YYYY-MM-DD) or 'Present'
 */

/**
 * @typedef {Object} Skills
 * @property {string[]} technical - List of technical skills
 * @property {string[]} soft - List of soft skills
 */

/**
 * @typedef {Object} Resume
 * @property {string} id - Unique identifier
 * @property {string} userId - User ID who owns the resume
 * @property {string} title - Resume title
 * @property {PersonalInfo} personal - Personal information
 * @property {string} summary - Professional summary
 * @property {Experience[]} experience - Work experience
 * @property {Education[]} education - Education history
 * @property {Skills} skills - Skills
 * @property {Project[]} projects - Projects
 * @property {string} template - Template ID
 * @property {string} theme - Theme ID
 * @property {string} status - Resume status (draft/published)
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */

/**
 * @typedef {Object} ResumeTemplate
 * @property {string} id - Template ID
 * @property {string} name - Template name
 * @property {string} description - Template description
 * @property {string} thumbnail - Thumbnail image URL
 * @property {string} preview - Preview image URL
 * @property {string} category - Template category
 * @property {boolean} isPremium - Whether template is premium
 * @property {number} price - Template price (if premium)
 * @property {string[]} features - Template features
 * @property {string[]} sections - Available sections
 * @property {string} layout - Layout type
 * @property {Object} colors - Color scheme
 * @property {Object} fonts - Font settings
 */

/**
 * @typedef {Object} ResumeTheme
 * @property {string} id - Theme ID
 * @property {string} name - Theme name
 * @property {string} primary - Primary color
 * @property {string} secondary - Secondary color
 * @property {string} accent - Accent color
 * @property {string} background - Background color
 * @property {string} text - Text color
 */

module.exports = {
  PersonalInfo: {},
  Experience: {},
  Education: {},
  Project: {},
  Skills: {},
  Resume: {},
  ResumeTemplate: {},
  ResumeTheme: {}
}; 