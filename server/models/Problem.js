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
    firstStep: {
        type: Schema.Types.ObjectId,
        ref: 'Step'
    }
})

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;