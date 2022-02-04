const mongoose = require("mongoose");
const { Schema } = mongoose;

const responseSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: false,
  },
  nextStep: {
    type: Schema.Types.ObjectId,
    ref: "Step",
    required: false,
  },
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
