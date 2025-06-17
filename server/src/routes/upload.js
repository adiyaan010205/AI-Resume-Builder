import express from 'express';
import { upload, handleUploadError } from '../middleware/upload.js';
import { auth } from '../middleware/auth.js';
import { limiter } from '../middleware/rateLimiter.js';
import { UploadController } from '../controllers/uploadController.js';

const router = express.Router();

// Upload profile picture
router.post(
  '/profile-picture',
  auth,
  limiter,
  upload.single('profilePicture'),
  handleUploadError,
  UploadController.uploadProfilePicture
);

// Upload resume file
router.post(
  '/resume-file',
  auth,
  limiter,
  upload.single('resumeFile'),
  handleUploadError,
  UploadController.uploadResumeFile
);

// Upload project image
router.post(
  '/project-image',
  auth,
  limiter,
  upload.single('projectImage'),
  handleUploadError,
  UploadController.uploadProjectImage
);

// Delete uploaded file
router.delete(
  '/:filename',
  auth,
  limiter,
  UploadController.deleteFile
);

export default router; 