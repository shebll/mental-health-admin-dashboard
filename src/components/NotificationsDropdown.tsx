// components/NotificationsDropdown.tsx
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "@/context/NotificationsContext";
import PostSkeleton from "./PostSkeleton";

const NotificationsDropdown: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { notifications, fetchNotifications, loading, hasMore } =
    useNotifications();
  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      console.log(hasMore);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg max-h-96 overflow-auto">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      <div ref={ref} />
      {loading && (
        <>
          <PostSkeleton />
        </>
      )}
    </div>
  );
};

export default NotificationsDropdown;
