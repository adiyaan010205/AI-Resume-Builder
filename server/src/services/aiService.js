import { GoogleGenerativeAI } from '@google/generative-ai';
import { ApiError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateSummary(experience, skills, targetRole) {
    try {
      const prompt = `Create a professional resume summary for someone with the following background:
        Experience: ${experience}
        Skills: ${skills.join(', ')}
        Target Role: ${targetRole}
        Requirements:
        - Keep it between 50-100 words
        - Use action verbs and quantifiable achievements
        - Make it ATS-friendly
        - Focus on value proposition
        - Avoid first-person pronouns`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      logger.error('Error generating summary:', error);
      throw new ApiError(500, 'Failed to generate summary');
    }
  }

  async improveSummary(currentSummary, targetRole) {
    try {
      const prompt = `Improve the following resume summary for a ${targetRole} position:
        Current Summary: ${currentSummary}
        Requirements:
        - Make it more impactful and ATS-friendly
        - Add relevant keywords for ${targetRole}
        - Keep it concise and professional`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      logger.error('Error improving summary:', error);
      throw new ApiError(500, 'Failed to improve summary');
    }
  }

  async suggestSkills(experience, targetRole) {
    try {
      const prompt = `Based on the following experience and target role, suggest relevant skills:
        Experience: ${experience}
        Target Role: ${targetRole}
        Requirements:
        - Include both technical and soft skills
        - Focus on skills relevant to ${targetRole}
        - List skills in order of importance`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().split(',').map(skill => skill.trim());
    } catch (error) {
      logger.error('Error suggesting skills:', error);
      throw new ApiError(500, 'Failed to suggest skills');
    }
  }

  async enhanceExperience(experience, targetRole) {
    try {
      const prompt = `Enhance the following work experience for a ${targetRole} position:
        Experience: ${experience}
        Requirements:
        - Use strong action verbs
        - Add quantifiable achievements
        - Make it more impactful
        - Focus on relevant responsibilities`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      logger.error('Error enhancing experience:', error);
      throw new ApiError(500, 'Failed to enhance experience');
    }
  }

  async analyzeResume(resume, targetRole) {
    try {
      const prompt = `Analyze the following resume for a ${targetRole} position:
        Resume: ${resume}
        Requirements:
        - Identify strengths and weaknesses
        - Suggest improvements
        - Check for ATS compatibility
        - Evaluate relevance to ${targetRole}`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      logger.error('Error analyzing resume:', error);
      throw new ApiError(500, 'Failed to analyze resume');
    }
  }

  async generateKeywords(jobDescription, resume) {
    try {
      const prompt = `Generate relevant keywords based on the following job description and resume:
        Job Description: ${jobDescription}
        Resume: ${resume}
        Requirements:
        - Extract key skills and qualifications
        - Identify industry-specific terms
        - List in order of importance`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().split(',').map(keyword => keyword.trim());
    } catch (error) {
      logger.error('Error generating keywords:', error);
      throw new ApiError(500, 'Failed to generate keywords');
    }
  }
}

export { AIService }; 