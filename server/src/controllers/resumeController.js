import { ResumeService } from '../services/resumeService.js';
import { ApiError } from '../utils/errors.js';
import { validationResult } from 'express-validator';
import logger from '../utils/logger.js';

class ResumeController {
  constructor() {
    this.resumeService = new ResumeService();
  }

  async getAllResumes(req, res, next) {
    try {
      const resumes = await this.resumeService.getAllResumes();
      res.json({ success: true, data: resumes });
    } catch (error) {
      next(error);
    }
  }

  async getResumeById(req, res, next) {
    try {
      const { id } = req.params;
      const resume = await this.resumeService.getResumeById(id);
      if (!resume) {
        throw new ApiError(404, 'Resume not found');
      }
      res.json({ success: true, data: resume });
    } catch (error) {
      next(error);
    }
  }

  async createResume(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const resumeData = {
        ...req.body,
        userId: req.user.id // Assuming user is attached by auth middleware
      };

      const resume = await this.resumeService.createResume(resumeData);
      res.status(201).json({ success: true, data: resume });
    } catch (error) {
      next(error);
    }
  }

  async updateResume(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const { id } = req.params;
      const resume = await this.resumeService.updateResume(id, req.body);
      if (!resume) {
        throw new ApiError(404, 'Resume not found');
      }
      res.json({ success: true, data: resume });
    } catch (error) {
      next(error);
    }
  }

  async deleteResume(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.resumeService.deleteResume(id);
      if (!result) {
        throw new ApiError(404, 'Resume not found');
      }
      res.json({ success: true, message: 'Resume deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async saveDraft(req, res, next) {
    try {
      const { id } = req.params;
      const resume = await this.resumeService.saveDraft(id);
      if (!resume) {
        throw new ApiError(404, 'Resume not found');
      }
      res.json({ success: true, data: resume });
    } catch (error) {
      next(error);
    }
  }

  async publishResume(req, res, next) {
    try {
      const { id } = req.params;
      const resume = await this.resumeService.publishResume(id);
      if (!resume) {
        throw new ApiError(404, 'Resume not found');
      }
      res.json({ success: true, data: resume });
    } catch (error) {
      next(error);
    }
  }
}

export { ResumeController }; 