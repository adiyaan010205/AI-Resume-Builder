import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { ApiError } from '../utils/errors.js';
import config from '../utils/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UploadController {
  static async uploadProfilePicture(req, res, next) {
    try {
      if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
      }

      // Get file information
      const fileInfo = {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
      };

      // Update user profile picture in database
      // TODO: Implement user profile picture update

      res.status(200).json({
        success: true,
        data: {
          file: fileInfo,
          message: 'Profile picture uploaded successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadResumeFile(req, res, next) {
    try {
      if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
      }

      // Get file information
      const fileInfo = {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
      };

      // Update resume file in database
      // TODO: Implement resume file update

      res.status(200).json({
        success: true,
        data: {
          file: fileInfo,
          message: 'Resume file uploaded successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async uploadProjectImage(req, res, next) {
    try {
      if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
      }

      // Get file information
      const fileInfo = {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
      };

      // Update project image in database
      // TODO: Implement project image update

      res.status(200).json({
        success: true,
        data: {
          file: fileInfo,
          message: 'Project image uploaded successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFile(req, res, next) {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, '../../uploads', filename);

      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (error) {
        throw new ApiError(404, 'File not found');
      }

      // Delete file
      await fs.unlink(filePath);

      res.status(200).json({
        success: true,
        data: {
          message: 'File deleted successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export { UploadController }; 