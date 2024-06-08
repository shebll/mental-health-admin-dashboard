import React, { useState } from "react";
import NotificationsDropdown from "./NotificationsDropdown";
import { useNotifications } from "@/context/NotificationsContext";

const NotificationIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { newNotificationCount } = useNotifications();

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405C18.368 15.216 18 14.112 18 13V8a6 6 0 10-12 0v5c0 1.112-.368 2.216-1.595 2.595L3 17h5m4 0v1a3 3 0 01-6 0v-1m6 0H9"
          ></path>
        </svg>
        {newNotificationCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {newNotificationCount}
          </span>
        )}
      </button>
      {isOpen && <NotificationsDropdown />}
    </div>
  );
};

export default NotificationIcon;
