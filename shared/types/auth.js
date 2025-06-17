/**
 * @typedef {Object} LoginCredentials
 * @property {string} email - User email
 * @property {string} password - User password
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} email - User email
 * @property {string} password - User password
 * @property {string} fullName - User's full name
 */

/**
 * @typedef {Object} AuthResponse
 * @property {string} token - JWT token
 * @property {Object} user - User data
 * @property {Date} expiresAt - Token expiration date
 */

/**
 * @typedef {Object} PasswordReset
 * @property {string} email - User email
 * @property {string} token - Reset token
 * @property {Date} expiresAt - Token expiration date
 */

/**
 * @typedef {Object} ChangePassword
 * @property {string} currentPassword - Current password
 * @property {string} newPassword - New password
 */

/**
 * @typedef {Object} OAuthProfile
 * @property {string} provider - OAuth provider (google/github)
 * @property {string} id - Provider user ID
 * @property {string} email - User email
 * @property {string} name - User name
 * @property {string} picture - Profile picture URL
 */

module.exports = {
  LoginCredentials: {},
  RegisterData: {},
  AuthResponse: {},
  PasswordReset: {},
  ChangePassword: {},
  OAuthProfile: {}
}; 