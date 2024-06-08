import React from "react";

const Notification = ({ notification }: any) => {
  const navigate = useNavigate();
  const notificationDate = calculateDuration(notification.dateCreated);

  return (
    <div
      key={notification.id}
      className="notification-container"
      onClick={() => navigate(`/forums/${notification.resources.postId}`)}
    >
      <div className="notification-message">
        <p>{notification.message}</p>
      </div>
      <div className="notification-info">
        <p>{notificationDate}</p>
        <p>{notification.type}</p>
      </div>
    </div>
  );
};

export default Notification;
