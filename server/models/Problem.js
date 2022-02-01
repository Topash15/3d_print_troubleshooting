const mongoose = require('mongoose');
const {Schema} = mongoose;

const problemSchema = new Schema({
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
    links: {
        type: String,
        required: false
    },
    photos: {
        type: String,
        required: false
    },
    responses: {
        type: String,
        required: true,
        trim: true
    }
})

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;