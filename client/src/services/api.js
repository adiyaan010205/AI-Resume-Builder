const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const saveResume = async (resumeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });

    if (!response.ok) {
      throw new Error('Failed to save resume');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving resume:', error);
    throw error;
  }
};

export const loadResume = async (resumeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/${resumeId}`);

    if (!response.ok) {
      throw new Error('Failed to load resume');
    }

    return await response.json();
  } catch (error) {
    console.error('Error loading resume:', error);
    throw error;
  }
};

export const generatePDF = async (resumeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    return await response.blob();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export default {
  saveResume,
  loadResume,
  generatePDF,
}; 