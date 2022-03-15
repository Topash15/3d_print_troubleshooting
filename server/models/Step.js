const mongoose = require("mongoose");

const { Schema } = mongoose;

const stepSchema = new Schema({
  step: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: false,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
  },
  responses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Response",
    },
  ],
  linkedResponses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Response",
    },
  ],
  successCount: {
    type: Number,
    default: 0
  },
  totalCount: {
    type: Number,
    default: 0
  }
});

const Step = mongoose.model("Step", stepSchema);

module.exports = Step;
