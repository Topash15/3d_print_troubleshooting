const mongoose = require('mongoose');

const {Schema} = mongoose;

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
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        unique: true
    }]
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;