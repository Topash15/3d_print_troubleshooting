const mongoose = require('mongoose');

const {Schema} = mongoose;
const Answer = require('./Answer')

const questionSchema = new Schema ({
    question: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: false,
        trim: true
    },
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }]
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;