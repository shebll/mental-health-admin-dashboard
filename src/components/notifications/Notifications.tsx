"use client";
import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { toast } from "sonner";

export default function Notifications({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) {
  const [notifications, setNotifications] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [hubConnection, setHubConnection] = useState<any>(null);

  const createHubConnection = (token: string) => {
    if (token) {
      const hubConnect = new signalR.HubConnectionBuilder()
        .withUrl("https://nexus-api-h3ik.onrender.com/notification-hub", {
          accessTokenFactory: () => token as string,
        })
        .withAutomaticReconnect()
        .build();

      hubConnect.start().catch((err) => {
        console.error("Error connecting to server:", err);
      });
      hubConnect.on("ReceiveNotification", (notification) => {
        // Update notifications array with new notification
        console.log("Notification received:", notification);
        setNotifications((prevNotifications: any) => [
          notification,
          ...prevNotifications,
        ]);
        // Display toast for the new notification
        toast.info(notification.message);
      });

      hubConnect.onclose((error) => {
        console.error("Connection closed due to error:", error);
      });

      setHubConnection(hubConnect);
    }
  };

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await fetch(
  //       `
  //     https://nexus-api-h3ik.onrender.com/notifications/user/${userId}?PageNumber=${page}&PageSize=${pageSize}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const res = await response.json();

  //     console.log(res);
  //     const newNotifications = res.data;
  //     console.log(newNotifications);
  //     setNotifications((prevNotifications) => [
  //       ...prevNotifications,
  //       ...newNotifications,
  //     ]);
  //     setPage((prevPage) => prevPage + 1);
  //     setHasMore(newNotifications.length === pageSize);
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  useEffect(() => {
    if (token) {
      createHubConnection(token);
    }

    return () => {
      if (hubConnection) {
        hubConnection.stop().then(() => console.log("Connection stopped"));
      }
    };
  }, [token]); // Only depend on token

  return <div className="w-100"></div>;
}
