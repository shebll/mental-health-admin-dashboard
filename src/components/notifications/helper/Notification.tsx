import { useRouter } from "next/navigation";
import React from "react";

const Notification = ({ notification }: any) => {
  const router = useRouter();
  // const notificationDate = calculateDuration(notification.dateCreated);

  return (
    <div
      key={notification.id}
      className="notification-container"
      onClick={() => router.push(`/forums/${notification.resources.postId}`)}
    >
      <div className="notification-message">
        <p>{notification.message}</p>
      </div>
      <div className="notification-info">
        <p>{notification.dateCreated}</p>
        <p>{notification.type}</p>
      </div>
    </div>
  );
};

export default Notification;
