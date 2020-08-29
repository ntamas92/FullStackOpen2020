import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap"

export const notificationType = {
  INFO: "info",
  ERROR: "error"
}

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification)
    return null;

  const { message, type } = notification

  const success = type === notificationType.ERROR ? "danger" : "success"
  return (
    <div className="container">
      <Alert variant={success}>{message}</Alert>
    </div>
  );
};

export default Notification;
