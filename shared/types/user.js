/**
 * @typedef {Object} UserPreferences
 * @property {string} theme - Theme preference (light/dark/system)
 * @property {boolean} notifications - Whether to receive notifications
 * @property {boolean} isPremium - Whether user has premium subscription
 * @property {string} language - Preferred language
 * @property {Object} resumeDefaults - Default resume settings
 */

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} email - Email address
 * @property {string} fullName - Full name
 * @property {string} profilePicture - Profile picture URL
 * @property {string} role - User role (user/admin)
 * @property {boolean} isActive - Whether account is active
 * @property {Date} lastLogin - Last login date
 * @property {UserPreferences} preferences - User preferences
 * @property {Date} createdAt - Account creation date
 * @property {Date} updatedAt - Last update date
 */

/**
 * @typedef {Object} Subscription
 * @property {string} id - Subscription ID
 * @property {string} userId - User ID
 * @property {string} plan - Subscription plan
 * @property {string} status - Subscription status
 * @property {Date} startDate - Start date
 * @property {Date} endDate - End date
 * @property {boolean} autoRenew - Whether subscription auto-renews
 * @property {Object} features - Available features
 */

/**
 * @typedef {Object} Notification
 * @property {string} id - Notification ID
 * @property {string} userId - User ID
 * @property {string} type - Notification type
 * @property {string} title - Notification title
 * @property {string} message - Notification message
 * @property {boolean} read - Whether notification is read
 * @property {Date} createdAt - Creation date
 */

/**
 * @typedef {Object} UserStats
 * @property {number} totalResumes - Total number of resumes
 * @property {number} publishedResumes - Number of published resumes
 * @property {number} totalDownloads - Total number of downloads
 * @property {number} totalShares - Total number of shares
 * @property {Date} lastActivity - Last activity date
 */

module.exports = {
  UserPreferences: {},
  User: {},
  Subscription: {},
  Notification: {},
  UserStats: {}
}; 