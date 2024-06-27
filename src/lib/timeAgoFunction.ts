export const timeAgo = (postDate: string | number | Date): string => {
  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  const local = new Date(currentDate.getTime() + offset * 60000);

  const timeDifference = local.getTime() - new Date(postDate).getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  let durationString = "";

  if (seconds < minute) {
    if (seconds < 10) {
      durationString = `just now`;
    } else {
      durationString = `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    durationString = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    durationString = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (seconds < month) {
    const days = Math.floor(seconds / day);
    durationString = `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (seconds < year) {
    const months = Math.floor(seconds / month);
    durationString = `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const formattedDate = new Date(postDate).toLocaleDateString();
    const formattedTime = new Date(postDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    durationString = `on ${formattedDate} at ${formattedTime}`;
  }

  return durationString;
};

export const formatDateTimeRange = (
  startTime: string | number | Date,
  endTime: string | number | Date
): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = end.getTime() - start.getTime();
  const durationMins = Math.round(durationMs / 60000); // Total duration in minutes

  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    start
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(start);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(start);

  return `${durationMins} mins on ${dayName}, ${formattedDate} at ${formattedTime}`;
};
