const mongoose = require('mongoose');
const {Schema} = mongoose;


const answerSchema = new Schema({
    text : {
        type: String,
        required: true,
        trim: true,
    },
    photo: {
        type: String,
        required: false
    },
    nextQuestion: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: false
    }],
    Solution: [{
        type: Schema.Types.ObjectId,
        ref: "Solution",
        required: false
    }]
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer