const mongoose = require('mongoose');

const collaborateProjectsSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
    },
    }, {
        collection: 'CollaborateProjects'
    });

const CollaborateProjects = mongoose.model('CollaborateProjects', collaborateProjectsSchema);

module.exports = CollaborateProjects;