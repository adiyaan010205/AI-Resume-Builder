const User = require('../models/user');
const { ApiError } = require('../utils/errors');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.find({})
        .select('-password')
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: {
          users
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await User.findById(req.params.id).select('-password');
      
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      res.status(200).json({
        success: true,
        data: {
          user
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { fullName, email, role, isActive, preferences } = req.body;
      const user = await User.findById(req.params.id);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      // Update fields
      if (fullName) user.fullName = fullName;
      if (email) user.email = email;
      if (role) user.role = role;
      if (typeof isActive === 'boolean') user.isActive = isActive;
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

  static async deleteUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      await user.remove();

      res.status(200).json({
        success: true,
        data: {
          message: 'User deleted successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfilePicture(req, res, next) {
    try {
      if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      // Update profile picture
      user.profilePicture = req.file.path;
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

  static async getUsersStats(req, res, next) {
    try {
      const totalUsers = await User.countDocuments();
      const activeUsers = await User.countDocuments({ isActive: true });
      const premiumUsers = await User.countDocuments({ 'preferences.isPremium': true });
      const newUsers = await User.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      });

      res.status(200).json({
        success: true,
        data: {
          stats: {
            total: totalUsers,
            active: activeUsers,
            premium: premiumUsers,
            new: newUsers
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController; 