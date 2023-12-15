const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignmentSubmissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Reference to User model
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
    }, // Reference to Course model
    weekNumber: {
        type: Number,
        required: true
    },
    submissionLink: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },

});

assignmentSubmissionSchema.statics.getAssignmentId = async function (userId, courseId, weekNumber) {
    const assignment = await this.findOne({ userId, courseId, weekNumber });
    return assignment ? assignment._id : null;
  };
  
  const AssignmentSubmission = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);
  
  module.exports = AssignmentSubmission;
