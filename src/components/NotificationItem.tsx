// components/NotificationItem.tsx
import { NotificationType } from "@/types/Notification";
import Image from "next/image";
import React from "react";

const NotificationItem: React.FC<{ notification: NotificationType }> = ({
  notification,
}) => {
  return (
    <div className="flex items-center p-4 border-b">
      <Image
        width={40}
        height={40}
        src={notification.notifierPhotoUrl}
        alt="Notifier"
        className="w-10 h-10 rounded-full mr-4"
      />
      <div>
        <p className="font-semibold">{notification.notifierUserName}</p>
        <p>{notification.message}</p>
        <p className="text-xs text-gray-500">
          {new Date(notification.dateCreated).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
