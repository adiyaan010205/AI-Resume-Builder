import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  personal: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  summary: {
    type: String,
    trim: true
  },
  experience: [{
    company: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    descriptions: [{
      type: String,
      trim: true
    }]
  }],
  education: [{
    institution: {
      type: String,
      required: true,
      trim: true
    },
    degree: {
      type: String,
      required: true,
      trim: true
    },
    field: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    gpa: {
      type: String,
      trim: true
    }
  }],
  skills: {
    technical: [{
      type: String,
      trim: true
    }],
    soft: [{
      type: String,
      trim: true
    }]
  },
  projects: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      trim: true
    },
    technologies: [{
      type: String,
      trim: true
    }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    }
  }],
  template: {
    type: String,
    trim: true
  },
  theme: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  }
}, {
  timestamps: true
});

// Pre-save middleware
resumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Pre-update middleware
resumeSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume; 