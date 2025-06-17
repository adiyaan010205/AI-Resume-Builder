import express from 'express';
import { auth } from '../middleware/auth.js';
import { limiter } from '../middleware/rateLimiter.js';
import { AuthController } from '../controllers/authController.js';
import { validateRegistration, validateLogin, validateProfileUpdate, validatePasswordChange } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/register', limiter, validateRegistration, AuthController.register);
router.post('/login', limiter, validateLogin, AuthController.login);

// Protected routes
router.get('/profile', auth, AuthController.getProfile);
router.put('/profile', auth, validateProfileUpdate, AuthController.updateProfile);
router.put('/change-password', auth, validatePasswordChange, AuthController.changePassword);
router.delete('/account', auth, AuthController.deleteAccount);

export default router; 