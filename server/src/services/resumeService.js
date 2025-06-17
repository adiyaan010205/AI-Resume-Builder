import Resume from '../models/resume.js';
import { ApiError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class ResumeService {
  async getAllResumes() {
    try {
      return await Resume.find().sort({ updatedAt: -1 });
    } catch (error) {
      logger.error('Error fetching resumes:', error);
      throw new ApiError(500, 'Failed to fetch resumes');
    }
  }

  async getResumeById(id) {
    try {
      return await Resume.findById(id);
    } catch (error) {
      logger.error('Error fetching resume:', error);
      throw new ApiError(500, 'Failed to fetch resume');
    }
  }

  async createResume(resumeData) {
    try {
      const resume = new Resume(resumeData);
      await resume.save();
      return resume;
    } catch (error) {
      logger.error('Error creating resume:', error);
      throw new ApiError(500, 'Failed to create resume');
    }
  }

  async updateResume(id, updateData) {
    try {
      return await Resume.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    } catch (error) {
      logger.error('Error updating resume:', error);
      throw new ApiError(500, 'Failed to update resume');
    }
  }

  async deleteResume(id) {
    try {
      return await Resume.findByIdAndDelete(id);
    } catch (error) {
      logger.error('Error deleting resume:', error);
      throw new ApiError(500, 'Failed to delete resume');
    }
  }

  async saveDraft(id) {
    try {
      return await Resume.findByIdAndUpdate(
        id,
        { 
          $set: { 
            status: 'draft',
            updatedAt: new Date()
          }
        },
        { new: true }
      );
    } catch (error) {
      logger.error('Error saving draft:', error);
      throw new ApiError(500, 'Failed to save draft');
    }
  }

  async publishResume(id) {
    try {
      return await Resume.findByIdAndUpdate(
        id,
        { 
          $set: { 
            status: 'published',
            publishedAt: new Date(),
            updatedAt: new Date()
          }
        },
        { new: true }
      );
    } catch (error) {
      logger.error('Error publishing resume:', error);
      throw new ApiError(500, 'Failed to publish resume');
    }
  }
}

export { ResumeService }; 