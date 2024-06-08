import React from "react";

const CustomNotificationToast = ({ message, notificationId }: any) => {
  const handleClick = () => {
    // Handle click action, such as redirecting to the notification details page
    console.log("Notification clicked. ID:", notificationId);
  };

  const toastStyle = css`
    background-color: #4caf50;
    color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #388e3c;
    }
  `;

  return (
    <div onClick={handleClick} css={toastStyle}>
      <p>{message}</p>
      <a
        href={`/notifications/${notificationId}`}
        style={{ color: "#fff", textDecoration: "underline" }}
      >
        View Details
      </a>
    </div>
  );
};

export const customToast = (message, notificationId) => {
  toast.custom((t) => (
    <CustomNotificationToast
      message={message}
      notificationId={notificationId}
    />
  ));
};
