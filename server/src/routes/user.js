const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const { limiter } = require('../middleware/rateLimiter');
const { upload } = require('../middleware/upload');
const UserController = require('../controllers/userController');
const { validateUserUpdate } = require('../middleware/validation');

// Admin routes
router.get('/', auth, admin, UserController.getAllUsers);
router.get('/stats', auth, admin, UserController.getUsersStats);
router.get('/:id', auth, admin, UserController.getUserById);
router.put('/:id', auth, admin, validateUserUpdate, UserController.updateUser);
router.delete('/:id', auth, admin, UserController.deleteUser);

// User routes
router.put(
  '/profile/picture',
  auth,
  limiter,
  upload.single('profilePicture'),
  UserController.updateProfilePicture
);

module.exports = router; 