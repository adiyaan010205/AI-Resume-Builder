export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-()]{10,}$/;
  return re.test(phone);
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateDate = (date) => {
  if (!date) return true;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

export const validateExperience = (experience) => {
  return experience.every(exp => 
    validateRequired(exp.title) &&
    validateRequired(exp.company) &&
    validateDate(exp.startDate) &&
    validateDate(exp.endDate) &&
    exp.description.every(validateRequired)
  );
};

export const validateEducation = (education) => {
  return education.every(edu =>
    validateRequired(edu.degree) &&
    validateRequired(edu.school) &&
    validateDate(edu.startDate) &&
    validateDate(edu.endDate)
  );
};

export const validateSkills = (skills) => {
  return skills.every(validateRequired);
};

export const validateProject = (project) => {
  return (
    validateRequired(project.name) &&
    validateRequired(project.description) &&
    (!project.url || validateURL(project.url)) &&
    validateDate(project.startDate) &&
    validateDate(project.endDate)
  );
};

export default {
  validateEmail,
  validatePhone,
  validateURL,
  validateRequired,
  validateDate,
  validateExperience,
  validateEducation,
  validateSkills,
  validateProject,
}; 