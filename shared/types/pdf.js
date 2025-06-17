/**
 * @typedef {Object} PDFGenerationRequest
 * @property {Resume} resume - Resume data
 * @property {string} templateId - Template ID
 * @property {Object} options - Generation options
 * @property {boolean} options.includeHeader - Whether to include header
 * @property {boolean} options.includeFooter - Whether to include footer
 * @property {boolean} options.includePageNumbers - Whether to include page numbers
 * @property {string} options.pageSize - Page size (A4/Letter)
 * @property {string} options.orientation - Page orientation (portrait/landscape)
 */

/**
 * @typedef {Object} PDFGenerationResponse
 * @property {string} id - Generated PDF ID
 * @property {string} url - PDF URL
 * @property {string} previewUrl - Preview URL
 * @property {number} size - File size in bytes
 * @property {Date} createdAt - Generation date
 */

/**
 * @typedef {Object} PDFTemplate
 * @property {string} id - Template ID
 * @property {string} name - Template name
 * @property {string} description - Template description
 * @property {string} thumbnail - Thumbnail URL
 * @property {string} preview - Preview URL
 * @property {string} category - Template category
 * @property {boolean} premium - Whether template is premium
 * @property {number} price - Template price
 * @property {Array<string>} features - Template features
 * @property {Object} layout - Template layout
 * @property {Object} colors - Template colors
 * @property {Object} fonts - Template fonts
 */

/**
 * @typedef {Object} PDFTheme
 * @property {string} id - Theme ID
 * @property {string} name - Theme name
 * @property {Object} colors - Theme colors
 * @property {Object} fonts - Theme fonts
 * @property {Object} spacing - Theme spacing
 * @property {Object} borders - Theme borders
 */

/**
 * @typedef {Object} PDFDownloadOptions
 * @property {boolean} watermark - Whether to add watermark
 * @property {string} format - Download format (PDF/DOCX)
 * @property {boolean} compress - Whether to compress file
 */

module.exports = {
  PDFGenerationRequest: {},
  PDFGenerationResponse: {},
  PDFTemplate: {},
  PDFTheme: {},
  PDFDownloadOptions: {}
}; 