
const mongoose = require('mongoose');

const projectSubmissionSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  submission: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Replace with your user model name
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectSubmission = mongoose.model('ProjectSubmission', projectSubmissionSchema);

module.exports = ProjectSubmission;
