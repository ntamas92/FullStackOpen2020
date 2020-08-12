import React from "react";

const Notification = ({ message, isError }) => {
  if (message === null) return null;

  if (isError) {
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
