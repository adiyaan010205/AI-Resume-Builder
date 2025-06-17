class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class DatabaseError extends ApiError {
  constructor(message = 'Database operation failed') {
    super(500, message);
  }
}

class ValidationError extends ApiError {
  constructor(message = 'Validation failed', errors = []) {
    super(400, message, errors);
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

class AuthenticationError extends ApiError {
  constructor(message = 'Authentication failed') {
    super(401, message);
  }
}

class AuthorizationError extends ApiError {
  constructor(message = 'Not authorized') {
    super(403, message);
  }
}

class AIError extends ApiError {
  constructor(message = 'AI service error') {
    super(500, message);
  }
}

class PDFError extends ApiError {
  constructor(message = 'PDF generation failed') {
    super(500, message);
  }
}

export {
  ApiError,
  DatabaseError,
  ValidationError,
  NotFoundError,
  AuthenticationError,
  AuthorizationError,
  AIError,
  PDFError
}; 