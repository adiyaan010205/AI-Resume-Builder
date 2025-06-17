import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new AuthenticationError('No authentication token provided');
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AuthenticationError('Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new AuthenticationError('Token expired'));
    } else {
      next(error);
    }
  }
};

const admin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throw new AuthorizationError('Admin access required');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { auth, admin }; 