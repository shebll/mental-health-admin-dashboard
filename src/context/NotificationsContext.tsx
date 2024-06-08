// context/NotificationsContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { toast } from "sonner";
import { NotificationType } from "@/types/Notification";

interface NotificationsContextType {
  notifications: NotificationType[];
  newNotificationCount: number;
  hasMore: boolean;
  loading: boolean;
  fetchNotifications: (page: number) => Promise<void>;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};

export const NotificationsProvider = ({
  token,
  userId,
  children,
}: {
  token: string;
  userId: string;
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [hubConnection, setHubConnection] =
    useState<signalR.HubConnection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const pageSize = 5;

  const fetchNotifications = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nexus-api-h3ik.onrender.com/api/notifications/users/me?PageNumber=${page}&PageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newNotifications = await response.json();
      setNotifications((prev) => [...prev, ...newNotifications]);
      setHasMore(newNotifications.length === pageSize);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (token) {
      const hubConnect = new signalR.HubConnectionBuilder()
        .withUrl("https://nexus-api-h3ik.onrender.com/notification-hub", {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      hubConnect.start().catch((err) => {
        console.error("Error connecting to server:", err);
      });

      hubConnect.on("ReceiveNotification", (notification: NotificationType) => {
        setNotifications((prev) => [notification, ...prev]);
        setNewNotificationCount((prev) => prev + 1);
        toast.info(notification.message);
        new Audio("/notification-sound.mp3").play();
        document.title = "New Notification!";
      });

      hubConnect.onclose((error) => {
        console.error("Connection closed due to error:", error);
      });

      setHubConnection(hubConnect);
    }

    return () => {
      if (hubConnection) {
        hubConnection.stop().then(() => console.log("Connection stopped"));
      }
    };
  }, [token]);

  return (
    <NotificationsContext.Provider
      value={{
        hasMore,
        loading,
        notifications,
        newNotificationCount,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
