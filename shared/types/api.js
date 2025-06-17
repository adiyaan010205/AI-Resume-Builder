/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {string} message - Response message
 * @property {Object} data - Response data
 * @property {Object} meta - Metadata (pagination, etc.)
 */

/**
 * @typedef {Object} ApiError
 * @property {boolean} success - Always false for errors
 * @property {string} message - Error message
 * @property {string} code - Error code
 * @property {Object} errors - Detailed error information
 */

/**
 * @typedef {Object} PaginationMeta
 * @property {number} page - Current page number
 * @property {number} limit - Items per page
 * @property {number} total - Total number of items
 * @property {number} pages - Total number of pages
 */

/**
 * @typedef {Object} ValidationError
 * @property {string} field - Field name
 * @property {string} message - Error message
 * @property {string} code - Error code
 */

/**
 * @typedef {Object} FileUploadResponse
 * @property {string} filename - Uploaded file name
 * @property {string} path - File path
 * @property {string} url - File URL
 * @property {number} size - File size in bytes
 * @property {string} mimetype - File MIME type
 */

module.exports = {
  ApiResponse: {},
  ApiError: {},
  PaginationMeta: {},
  ValidationError: {},
  FileUploadResponse: {}
}; 