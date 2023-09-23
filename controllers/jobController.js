const ApplicationModel = require("../models/Application");
const JobModel = require("../models/Jobs");

const createJob = async (req, res) => {
  try {
    const {
      _id,
      description,
      stature,
      complexion,
      gender,
      agencyName,
      tags,
      price,
      color,
      location,
    } = req.body;

    const newJob = new JobModel({
      agencyUserId: _id,
      description,
      stature,
      agencyName,
      complexion,
      gender,
      tags,
      price,
      color,
      location,
    });

    console.log(newJob);
    await newJob.save();
    res.status(201).json({ message: "Job created successfully", data: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the job" });
  }
};

const getJobsForModels = async (req, res) => {
  try {
    const jobs = await JobModel.find()
      .populate("agencyName")
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching jobs" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await JobModel.findByIdAndDelete(jobId); // Remove the job from the database
    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    console.log(jobId);
    await ApplicationModel.deleteMany({ jobId });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "An error occurred while deleting the job" });
  }
};

const getjobsForAgency = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(req.params.id);
    const jobs = await JobModel.find({ agencyUserId: userId });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "An error occurred while fetching jobs" });
  }
};

const updateJob = async (req, res) => {
  try {
    const formData = req.body;

    console.log(formData);
    const query = { _id: formData._id };
    const updatedDocument = {
      $set: {
        description: formData.description,
        gender: formData.gender,
        stature: formData.stature,
        complexion: formData.complexion,
        tags: formData.tags,
      },
    };
    const insertedJob = await JobModel.findOneAndUpdate(
      query,
      updatedDocument,
      { new: true }
    );
    res.status(201).json({
      message: "Job updated successfully",
      data: insertedJob,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating job" });
  }
};

module.exports = {
  createJob,
  getJobsForModels,
  updateJob,
  getjobsForAgency,
  deleteJob,
};
