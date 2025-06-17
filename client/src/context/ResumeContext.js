import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  formData: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    experience: [],
    education: [],
    technicalSkills: [],
    softSkills: [],
    projects: []
  },
  activeSection: 'personal',
  activeTemplate: 'azurill',
  activeTheme: 'professional',
  isDarkMode: false
};

const ResumeContext = createContext();

const resumeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };
    case 'SET_ACTIVE_SECTION':
      return {
        ...state,
        activeSection: action.section
      };
    case 'SET_ACTIVE_TEMPLATE':
      return {
        ...state,
        activeTemplate: action.template
      };
    case 'SET_ACTIVE_THEME':
      return {
        ...state,
        activeTheme: action.theme
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        formData: {
          ...state.formData,
          experience: [...state.formData.experience, action.experience]
        }
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        formData: {
          ...state.formData,
          experience: state.formData.experience.map((exp, index) =>
            index === action.index ? { ...exp, ...action.updates } : exp
          )
        }
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        formData: {
          ...state.formData,
          experience: state.formData.experience.filter((_, index) => index !== action.index)
        }
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        formData: {
          ...state.formData,
          education: [...state.formData.education, action.education]
        }
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        formData: {
          ...state.formData,
          education: state.formData.education.map((edu, index) =>
            index === action.index ? { ...edu, ...action.updates } : edu
          )
        }
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        formData: {
          ...state.formData,
          education: state.formData.education.filter((_, index) => index !== action.index)
        }
      };
    case 'ADD_SKILL':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.skillType]: [...state.formData[action.skillType], action.skill]
        }
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.skillType]: state.formData[action.skillType].filter(
            skill => skill !== action.skill
          )
        }
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        formData: {
          ...state.formData,
          projects: [...state.formData.projects, action.project]
        }
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        formData: {
          ...state.formData,
          projects: state.formData.projects.map((project, index) =>
            index === action.index ? { ...project, ...action.updates } : project
          )
        }
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        formData: {
          ...state.formData,
          projects: state.formData.projects.filter((_, index) => index !== action.index)
        }
      };
    default:
      return state;
  }
};

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export default ResumeContext; 