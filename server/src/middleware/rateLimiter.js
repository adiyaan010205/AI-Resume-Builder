import rateLimit from 'express-rate-limit';
import config from '../utils/config.js';
import { ApiError } from '../utils/errors.js';

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: 'Too many requests from this IP, please try again later',
  handler: (req, res, next, options) => {
    next(new ApiError(429, options.message));
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Specific limiter for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // limit each IP to 50 requests per hour
  message: 'Too many AI requests from this IP, please try again later',
  handler: (req, res, next, options) => {
    next(new ApiError(429, options.message));
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Specific limiter for PDF generation
const pdfLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each IP to 20 PDF generations per hour
  message: 'Too many PDF generation requests from this IP, please try again later',
  handler: (req, res, next, options) => {
    next(new ApiError(429, options.message));
  },
  standardHeaders: true,
  legacyHeaders: false
});

export { limiter, aiLimiter, pdfLimiter }; 