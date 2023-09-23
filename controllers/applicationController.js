const ApplicationModel = require("../models/Application.js");
const NotificationModel = require("../models/Notifications.js");

const applyForJob = async (req, res) => {
  try {
    const { modelUserId, jobId } = req.body;

    const existingApplication = await ApplicationModel.findOne({
      modelUserId,
      jobId,
    });

    if (existingApplication) {
      // User has already applied for this job
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    const newApplication = new ApplicationModel({
      modelUserId,
      jobId,
    });
    await newApplication.save();
    res.status(201).json({
      message: "Application submitted successfully",
      data: newApplication,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application" });
  }
};

const getApplicationsForAgency = async (req, res) => {
  try {
    // Assuming you have agency user authentication middleware
    const agencyUserId = req.params.id;

    // console.log(agencyUserId);
    const applications = await ApplicationModel.find({})
      .populate({
        path: "jobId",
        populate: { path: "agencyName" }, // Assuming the field name is "agencyUserId"
      })
      .populate("modelUserId")
      .sort({ createdAt: -1 });

    const agencyApplications = applications.filter((application) => {
      const jobId = application.jobId;
      const modelUserId = application.modelUserId;
      const jobMatchesAgency = jobId && jobId.agencyUserId === agencyUserId;
      const modelApplied = modelUserId !== null;
      return jobMatchesAgency && modelApplied;
    });
    res.json(agencyApplications);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching applications" });
  }
};

const saveNotification = async (userId, message) => {
  const newNotification = new NotificationModel({
    userId,
    message,
    timestamp: Date.now(),
  });
  await newNotification.save();
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, title, agencyName } = req.body;
    console.log(status);

    const updatedApplication = await ApplicationModel.findByIdAndUpdate(
      id,
      { status, title, agencyName },
      { new: true }
    );

    const userId = updatedApplication.modelUserId;

    const notificationMessage = `Your application status for the job: ${title} by ${agencyName} has been updated to: ${status}`;
    saveNotification(userId, notificationMessage);

    res.json({
      message: "Application status updated",
      data: updatedApplication,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the status" });
  }
};

module.exports = {
  applyForJob,
  getApplicationsForAgency,
  updateApplicationStatus,
};
