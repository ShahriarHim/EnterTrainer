const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    serial: {
        type: String,
        unique: true,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
    },
    }, {
        collection: 'EventsSechema'
    });

const Events = mongoose.model('Events', EventsSchema);

module.exports = Events;
