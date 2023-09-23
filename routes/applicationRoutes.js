const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getApplicationsForAgency,
  updateApplicationStatus,
} = require("../controllers/applicationController");

router.post("/apply", applyForJob);
router.get("/model/applications/:id", getApplicationsForAgency);
router.put("/:id/status", updateApplicationStatus);

module.exports = { applicationRouter: router };
