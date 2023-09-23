const NotificationModel = require("../models/Notifications");

const getNotifications = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const notifications = await NotificationModel.find({ userId }).sort({
      timestamp: -1,
    });

    const unreadCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;
    res.json({ notifications, unreadCount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user notifications" });
  }
};

const getNotificationsCount = async (req, res) => {
  const userId = req.params.id;

  console.log(userId);

  try {
    const notifications = await NotificationModel.find({ userId }).sort({
      timestamp: -1,
    });

    const unreadCount = notifications.filter(
      (notification) => !notification.isRead
    ).length;
    res.json(unreadCount);
  } catch (error) {
    console.log(error);
  }
};

const updateReadStatus = async (req, res) => {
  const notificationId = req.params.id;
  const { read } = req.body;
  console.log(notificationId);
  console.log(read);

  try {
    // Use Mongoose to find the notification by ID and update the 'read' field
    const updatedNotification = await NotificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: read },
      { new: true } // This option returns the updated notification
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Send a response with the updated notification
    res.json({
      message: "Notification read status updated successfully",
      updatedNotification,
    });
  } catch (error) {
    console.error("Error updating notification read status:", error);
    res
      .status(500)
      .json({ error: "Failed to update notification read status" });
  }
};

module.exports = { getNotifications, updateReadStatus, getNotificationsCount };
