const express = require("express");
const {
  getNotifications,
  updateReadStatus,
  getNotificationsCount,
} = require("../controllers/notificationsController");

const router = express.Router();

router.get("/notifications/:id", getNotifications);
router.put("/notifications/:id", updateReadStatus);
router.get("/notifications/count/:id", getNotificationsCount);

module.exports = { notificationRouter: router };
