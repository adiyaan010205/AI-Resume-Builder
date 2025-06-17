import OpenAI from 'openai';
import logger from '../utils/logger.js';

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Rate limiting cache
    this.requestCache = new Map();
    this.rateLimit = {
      requests: 0,
      resetTime: Date.now() + 60000 // Reset every minute
    };
  }

  // Check rate limits
  checkRateLimit() {
    const now = Date.now();
    
    if (now > this.rateLimit.resetTime) {
      this.rateLimit.requests = 0;
      this.rateLimit.resetTime = now + 60000;
    }

    if (this.rateLimit.requests >= 50) { // 50 requests per minute
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    this.rateLimit.requests++;
  }

  // Cache management for similar requests
  getCacheKey(type, content) {
    const hash = require('crypto')
      .createHash('md5')
      .update(`${type}:${JSON.stringify(content)}`)
      .digest('hex');
    return hash;
  }

  // Generic AI generation method
  async generateContent(systemPrompt, userPrompt, options = {}) {
    try {
      this.checkRateLimit();

      const {
        maxTokens = 300,
        temperature = 0.7,
        model = 'gpt-4',
        responseFormat = null
      } = options;

      // Check cache first
      const cacheKey = this.getCacheKey('generation', { systemPrompt, userPrompt });
      if (this.requestCache.has(cacheKey)) {
        const cached = this.requestCache.get(cacheKey);
        if (Date.now() - cached.timestamp < 300000) { // 5 minutes cache
          return cached.result;
        }
      }

      const requestOptions = {
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: maxTokens,
        temperature,
      };

      if (responseFormat) {
        requestOptions.response_format = responseFormat;
      }

      const completion = await this.openai.chat.completions.create(requestOptions);

      const result = {
        content: completion.choices[0]?.message?.content?.trim(),
        usage: completion.usage,
        model: completion.model
      };

      // Cache the result
      this.requestCache.set(cacheKey, {
        result,
        timestamp: Date.now()
      });

      logger.info(`OpenAI API call successful - Tokens used: ${completion.usage.total_tokens}`);
      return result;

    } catch (error) {
      logger.error('OpenAI API error:', error);
      
      if (error.response?.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else if (error.response?.status === 401) {
        throw new Error('Invalid API key.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid request format.');
      }
      
      throw new Error('AI service temporarily unavailable.');
    }
  }

  // Specific methods for different types of content
  async generateSummary(data) {
    const systemPrompt = `You are an expert resume writer. Create professional, ATS-optimized resume summaries.`;
    
    const userPrompt = `
      Create a professional resume summary based on:
      Experience Level: ${data.experienceLevel}
      Target Role: ${data.targetRole}
      Skills: ${data.skills?.join(', ') || 'Not specified'}
      
      Requirements:
      - 50-100 words
      - Use action verbs
      - Include key achievements
      - Make it ATS-friendly
      - No first-person pronouns
    `;

    return this.generateContent(systemPrompt, userPrompt, { maxTokens: 200 });
  }

  async enhanceExperience(data) {
    const systemPrompt = `You are an expert resume writer. Transform job descriptions into achievement-focused bullet points.`;
    
    const userPrompt = `
      Enhance this job experience:
      Role: ${data.jobTitle}
      Company: ${data.company}
      Description: ${data.description}
      
      Create 3-5 bullet points that:
      - Use strong action verbs
      - Include quantifiable results
      - Focus on achievements, not duties
      - Are ATS-optimized
    `;

    return this.generateContent(systemPrompt, userPrompt, { maxTokens: 300 });
  }

  async suggestSkills(data) {
    const systemPrompt = `You are a career counselor. Suggest relevant skills based on job requirements.`;
    
    const userPrompt = `
      Based on this information, suggest relevant skills:
      Job Description: ${data.jobDescription}
      Current Skills: ${data.currentSkills?.join(', ') || 'None'}
      Target Role: ${data.targetRole}
      
      Return JSON with "technicalSkills" and "softSkills" arrays.
    `;

    return this.generateContent(systemPrompt, userPrompt, {
      maxTokens: 250,
      responseFormat: { type: "json_object" }
    });
  }

  // Cleanup old cache entries
  cleanupCache() {
    const now = Date.now();
    for (const [key, value] of this.requestCache.entries()) {
      if (now - value.timestamp > 300000) { // 5 minutes
        this.requestCache.delete(key);
      }
    }
  }
}

export default new OpenAIService();