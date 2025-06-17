import { body, param, validationResult } from 'express-validator';
import { ApiError } from '../utils/errors.js';

// Auth validation rules
export const validateRegistration = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('fullName').trim().notEmpty().withMessage('Full name is required')
];

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

export const validateProfileUpdate = [
  body('fullName').optional().trim().notEmpty().withMessage('Full name cannot be empty'),
  body('preferences').optional().isObject().withMessage('Preferences must be an object')
];

export const validatePasswordChange = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

// Resume validation rules
export const validateResume = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('personal.fullName').trim().notEmpty().withMessage('Full name is required'),
  body('personal.email').isEmail().withMessage('Valid email is required'),
  body('personal.phone').optional().trim(),
  body('personal.location').optional().trim(),
  body('personal.linkedin').optional().isURL().withMessage('Valid LinkedIn URL is required'),
  body('personal.website').optional().isURL().withMessage('Valid website URL is required'),
  body('summary').optional().trim(),
  body('experience').isArray().withMessage('Experience must be an array'),
  body('education').isArray().withMessage('Education must be an array'),
  body('skills.technical').isArray().withMessage('Technical skills must be an array'),
  body('skills.soft').isArray().withMessage('Soft skills must be an array'),
  body('projects').optional().isArray().withMessage('Projects must be an array'),
  body('template').optional().trim(),
  body('theme').optional().trim()
];

// AI request validation rules
export const validateAIRequest = [
  body('experience').isArray().withMessage('Experience must be an array'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('targetRole').trim().notEmpty().withMessage('Target role is required')
];

// PDF generation validation rules
export const validatePDFGeneration = [
  body('resumeId').trim().notEmpty().withMessage('Resume ID is required'),
  body('templateId').optional().trim(),
  body('options').optional().isObject().withMessage('Options must be an object')
];

// ID parameter validation
export const validateId = [
  param('id').isMongoId().withMessage('Invalid ID format')
];

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation error', errors.array());
  }
  next();
}; 