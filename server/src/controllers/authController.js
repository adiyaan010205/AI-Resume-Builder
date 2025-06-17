import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../utils/config.js';
import { ApiError } from '../utils/errors.js';

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password, fullName } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApiError(400, 'Email already registered');
      }

      // Create new user
      const user = new User({
        email,
        password,
        fullName
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        success: true,
        data: {
          user: user.toJSON(),
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError(401, 'Invalid credentials');
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(200).json({
        success: true,
        data: {
          user: user.toJSON(),
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      res.status(200).json({
        success: true,
        data: {
          user: user.toJSON()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { fullName, preferences } = req.body;
      const user = await User.findById(req.user.id);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      // Update fields
      if (fullName) user.fullName = fullName;
      if (preferences) user.preferences = { ...user.preferences, ...preferences };

      await user.save();

      res.status(200).json({
        success: true,
        data: {
          user: user.toJSON()
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        throw new ApiError(401, 'Current password is incorrect');
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        data: {
          message: 'Password updated successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAccount(req, res, next) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      await user.remove();

      res.status(200).json({
        success: true,
        data: {
          message: 'Account deleted successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController }; 