const mongoose = require("mongoose");
const { Schema } = mongoose;

const solutionSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    photo: {
        type: String,
        require: false,
        trim: true
    },
    links: {
        type: Array,
        require: false
    }
});

const Solution = mongoose.model("Solution", solutionSchema);

module.exports = Solution;
