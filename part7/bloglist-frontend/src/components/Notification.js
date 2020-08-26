import React from "react";
import { useSelector } from "react-redux";

export const notificationType = {
  INFO: "info",
  ERROR: "error"
}

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification)
    return null;

  const { message, type } = notification

  if (type === notificationType.ERROR) {
    return (
      <div className="notificationBar">
        <div className="errorNotification">{message}</div>
      </div>
    );
  }

  return (
    <div className="notificationBar">
      <div className="infoNotification">{message}</div>
    </div>
  );
};

export default Notification;
