import { useResume } from '../context/ResumeContext';

export const useResumeData = () => {
  const { state, dispatch } = useResume();

  const setFormData = (field, value) => {
    dispatch({ type: 'SET_FORM_DATA', field, value });
  };

  const setActiveSection = (section) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', section });
  };

  const addExperience = (experience) => {
    dispatch({ type: 'ADD_EXPERIENCE', experience });
  };

  const updateExperience = (index, updates) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', index, updates });
  };

  const removeExperience = (index) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', index });
  };

  const addEducation = (education) => {
    dispatch({ type: 'ADD_EDUCATION', education });
  };

  const updateEducation = (index, updates) => {
    dispatch({ type: 'UPDATE_EDUCATION', index, updates });
  };

  const removeEducation = (index) => {
    dispatch({ type: 'REMOVE_EDUCATION', index });
  };

  const addSkill = (skillType, skill) => {
    dispatch({ type: 'ADD_SKILL', skillType, skill });
  };

  const removeSkill = (skillType, skill) => {
    dispatch({ type: 'REMOVE_SKILL', skillType, skill });
  };

  const addProject = (project) => {
    dispatch({ type: 'ADD_PROJECT', project });
  };

  const updateProject = (index, updates) => {
    dispatch({ type: 'UPDATE_PROJECT', index, updates });
  };

  const removeProject = (index) => {
    dispatch({ type: 'REMOVE_PROJECT', index });
  };

  return {
    formData: state.formData,
    activeSection: state.activeSection,
    setFormData,
    setActiveSection,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject
  };
};

export default useResumeData; 