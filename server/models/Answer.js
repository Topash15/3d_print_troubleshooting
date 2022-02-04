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
    nextStep: {
        type: Schema.Types.ObjectId,
        ref: 'Step',
        required: false
    }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer