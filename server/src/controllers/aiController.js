import { GoogleGenerativeAI } from '@google/generative-ai';
import { validationResult } from 'express-validator';
import logger from '../utils/logger.js';
import { AIService } from '../services/aiService.js';
import { ApiError } from '../utils/errors.js';

class AIController {
  constructor() {
    this.aiService = new AIService();
  }

  async generateSummary(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const { experience, skills, targetRole } = req.body;
      const summary = await this.aiService.generateSummary(experience, skills, targetRole);
      res.json({ success: true, data: summary });
    } catch (error) {
      next(error);
    }
  }

  async improveSummary(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const { currentSummary, targetRole } = req.body;
      const improvedSummary = await this.aiService.improveSummary(currentSummary, targetRole);
      res.json({ success: true, data: improvedSummary });
    } catch (error) {
      next(error);
    }
  }

  async suggestSkills(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const { experience, targetRole } = req.body;
      const skills = await this.aiService.suggestSkills(experience, targetRole);
      res.json({ success: true, data: skills });
    } catch (error) {
      next(error);
    }
  }

  async enhanceExperience(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const { experience, targetRole } = req.body;
      const enhancedExperience = await this.aiService.enhanceExperience(experience, targetRole);
      res.json({ success: true, data: enhancedExperience });
    } catch (error) {
      next(error);
    }
  }

  async analyzeResume(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const { resume, targetRole } = req.body;
      const analysis = await this.aiService.analyzeResume(resume, targetRole);
      res.json({ success: true, data: analysis });
    } catch (error) {
      next(error);
    }
  }

  async generateKeywords(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const { jobDescription, resume } = req.body;
      const keywords = await this.aiService.generateKeywords(jobDescription, resume);
      res.json({ success: true, data: keywords });
    } catch (error) {
      next(error);
    }
  }
}

export { AIController };

// Generate resume summary
export const generateSummary = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { experience, skills, targetRole, experienceLevel } = req.body;

    const prompt = `
      Create a professional resume summary for someone with the following background:
      
      Experience Level: ${experienceLevel}
      Target Role: ${targetRole}
      Key Skills: ${skills?.join(', ') || 'Not specified'}
      Work Experience: ${experience || 'Not provided'}
      
      Requirements:
      - Keep it between 50-100 words
      - Use action verbs and quantifiable achievements where possible
      - Make it ATS-friendly
      - Focus on value proposition
      - Avoid first-person pronouns
      
      Generate only the summary text, no additional formatting or explanations.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer and career counselor. Generate professional, ATS-optimized resume content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const summary = completion.choices[0]?.message?.content?.trim();

    if (!summary) {
      throw new Error('Failed to generate summary');
    }

    res.json({
      success: true,
      data: {
        summary,
        usage: completion.usage
      }
    });

  } catch (error) {
    logger.error('Error generating summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate summary',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Enhance job description
export const enhanceJobDescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { jobTitle, company, description, achievements } = req.body;

    const prompt = `
      Enhance this job description for a resume:
      
      Job Title: ${jobTitle}
      Company: ${company}
      Current Description: ${description}
      Achievements: ${achievements || 'None provided'}
      
      Requirements:
      - Use strong action verbs
      - Include quantifiable results where possible
      - Make it concise and impactful
      - Optimize for ATS scanning
      - Focus on accomplishments, not just duties
      - Keep each bullet point to 1-2 lines
      
      Return 3-5 enhanced bullet points for this role.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer. Transform job descriptions into achievement-focused, quantifiable bullet points."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const enhancedDescription = completion.choices[0]?.message?.content?.trim();

    if (!enhancedDescription) {
      throw new Error('Failed to enhance job description');
    }

    res.json({
      success: true,
      data: {
        enhancedDescription,
        usage: completion.usage
      }
    });

  } catch (error) {
    logger.error('Error enhancing job description:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to enhance job description',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Optimize resume for ATS
export const optimizeForATS = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { resumeContent, jobDescription } = req.body;

    const prompt = `
      Analyze this resume against the job description and provide ATS optimization suggestions:
      
      Resume Content: ${JSON.stringify(resumeContent)}
      Job Description: ${jobDescription}
      
      Please provide:
      1. Missing keywords that should be added
      2. Suggestions for better keyword integration
      3. ATS compatibility score (1-10)
      4. Specific improvements for each section
      
      Return a JSON object with these fields: missingKeywords, suggestions, atsScore, sectionImprovements
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an ATS optimization expert. Analyze resumes for keyword optimization and ATS compatibility."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.5,
      response_format: { type: "json_object" }
    });

    const optimization = JSON.parse(completion.choices[0]?.message?.content?.trim());

    if (!optimization) {
      throw new Error('Failed to optimize for ATS');
    }

    res.json({
      success: true,
      data: {
        ...optimization,
        usage: completion.usage
      }
    });

  } catch (error) {
    logger.error('Error optimizing for ATS:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to optimize for ATS',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Custom AI suggestions
export const customSuggestion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { prompt, context, section } = req.body;

    const systemPrompt = `
      You are an expert resume writer and career counselor. 
      
      Context: User is working on the "${section}" section of their resume.
      Additional Context: ${context || 'No additional context provided'}
      
      Guidelines:
      - Provide professional, actionable advice
      - Keep responses concise and relevant
      - Focus on industry best practices
      - Make suggestions ATS-friendly
      - Use clear, professional language
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const suggestion = completion.choices[0]?.message?.content?.trim();

    if (!suggestion) {
      throw new Error('Failed to generate suggestion');
    }

    res.json({
      success: true,
      data: {
        suggestion,
        usage: completion.usage
      }
    });

  } catch (error) {
    logger.error('Error generating custom suggestion:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate suggestion',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};