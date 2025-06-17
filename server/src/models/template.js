const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['professional', 'creative', 'modern', 'minimal', 'academic'],
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0
  },
  features: [{
    type: String
  }],
  sections: [{
    type: String,
    enum: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
    required: true
  }],
  layout: {
    type: String,
    enum: ['single-column', 'two-column', 'sidebar'],
    required: true
  },
  colors: {
    primary: {
      type: String,
      required: true
    },
    secondary: {
      type: String,
      required: true
    },
    accent: {
      type: String,
      required: true
    }
  },
  fonts: {
    heading: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  version: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
templateSchema.index({ category: 1, isPremium: 1 });
templateSchema.index({ name: 'text', description: 'text' });

const Template = mongoose.model('Template', templateSchema);

module.exports = Template; 