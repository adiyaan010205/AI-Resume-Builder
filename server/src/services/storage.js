const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../utils/config');
const logger = require('../utils/logger');
const { ApiError } = require('../utils/errors');

class StorageService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads');
    this.ensureUploadDir();
  }

  async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch (error) {
      await fs.mkdir(this.uploadDir, { recursive: true });
      logger.info('Created uploads directory');
    }
  }

  async saveFile(file, options = {}) {
    try {
      const {
        directory = '',
        filename = uuidv4(),
        extension = path.extname(file.originalname)
      } = options;

      // Create directory if it doesn't exist
      const targetDir = path.join(this.uploadDir, directory);
      await fs.mkdir(targetDir, { recursive: true });

      // Generate full file path
      const filePath = path.join(targetDir, `${filename}${extension}`);

      // Save file
      await fs.writeFile(filePath, file.buffer);

      return {
        filename: `${filename}${extension}`,
        path: filePath,
        url: `/uploads/${directory}/${filename}${extension}`
      };
    } catch (error) {
      logger.error('Error saving file', { error });
      throw new ApiError(500, 'Error saving file');
    }
  }

  async deleteFile(filePath) {
    try {
      const fullPath = path.join(this.uploadDir, filePath);
      await fs.unlink(fullPath);
      logger.info('File deleted successfully', { filePath });
    } catch (error) {
      logger.error('Error deleting file', { error });
      throw new ApiError(500, 'Error deleting file');
    }
  }

  async getFile(filePath) {
    try {
      const fullPath = path.join(this.uploadDir, filePath);
      const file = await fs.readFile(fullPath);
      return file;
    } catch (error) {
      logger.error('Error reading file', { error });
      throw new ApiError(404, 'File not found');
    }
  }

  async listFiles(directory = '') {
    try {
      const targetDir = path.join(this.uploadDir, directory);
      const files = await fs.readdir(targetDir);
      return files;
    } catch (error) {
      logger.error('Error listing files', { error });
      throw new ApiError(500, 'Error listing files');
    }
  }

  async moveFile(sourcePath, destinationPath) {
    try {
      const fullSourcePath = path.join(this.uploadDir, sourcePath);
      const fullDestinationPath = path.join(this.uploadDir, destinationPath);

      // Create destination directory if it doesn't exist
      await fs.mkdir(path.dirname(fullDestinationPath), { recursive: true });

      await fs.rename(fullSourcePath, fullDestinationPath);
      logger.info('File moved successfully', { sourcePath, destinationPath });
    } catch (error) {
      logger.error('Error moving file', { error });
      throw new ApiError(500, 'Error moving file');
    }
  }

  async copyFile(sourcePath, destinationPath) {
    try {
      const fullSourcePath = path.join(this.uploadDir, sourcePath);
      const fullDestinationPath = path.join(this.uploadDir, destinationPath);

      // Create destination directory if it doesn't exist
      await fs.mkdir(path.dirname(fullDestinationPath), { recursive: true });

      await fs.copyFile(fullSourcePath, fullDestinationPath);
      logger.info('File copied successfully', { sourcePath, destinationPath });
    } catch (error) {
      logger.error('Error copying file', { error });
      throw new ApiError(500, 'Error copying file');
    }
  }

  async getFileStats(filePath) {
    try {
      const fullPath = path.join(this.uploadDir, filePath);
      const stats = await fs.stat(fullPath);
      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        isDirectory: stats.isDirectory()
      };
    } catch (error) {
      logger.error('Error getting file stats', { error });
      throw new ApiError(404, 'File not found');
    }
  }
}

module.exports = new StorageService(); 