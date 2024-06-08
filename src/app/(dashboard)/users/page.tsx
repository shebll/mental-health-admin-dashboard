"use client";
import { NotificationsProvider } from "@/context/NotificationsContext";
import NotificationIcon from "@/components/NotificationIcon";
import Notifications from "@/components/notifications/Notifications";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import PageTitle from "@/components/ui/PageTitle";

{
  /* <PageTitle title="Users" /> */
}
function Users() {
  const { token, user } = useAuth();
  if (token && user) {
    return (
      <NotificationsProvider token={token} userId={user.id}>
        <div className="relative  w-fit">
          <NotificationIcon />
          users
        </div>
      </NotificationsProvider>
    );
  } else {
    return <div>...</div>;
  }
}

export default Users;
