const express = require("express");
// const { model } = require("mongoose");
const {
  createJob,
  getJobsForModels,
  getjobsForAgency,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

const isJobOwner = async (req, res, next) => {
  const { jobId } = req.params;
  const job = await JobModel.findById(jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (job.agencyUserId !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized to update this job" });
  }

  req.job = job; // Pass the job data to the next middleware/controller
  next();
};

router.post("/create", createJob);
router.get("/models/getjobs", getJobsForModels);
router.get("/getjobs/:id", getjobsForAgency);
router.put("/updatejob", updateJob);
router.delete("/deletejob/:id", deleteJob);

module.exports = { jobRouter: router };
