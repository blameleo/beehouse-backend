const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobId: mongoose.Schema.Types.ObjectId,
  agencyUserId: { type: String, required: true },
  agencyName: { type: String, required: true },
  description: { type: String, required: true },
  gender: { type: String },
  stature: { type: String },
  complexion: { type: String },
  tags: [String],
  price: Number,
  location: String,
  color: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobModel = mongoose.model("jobs", JobSchema);

module.exports = JobModel;
