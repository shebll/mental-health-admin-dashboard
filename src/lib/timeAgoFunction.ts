export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${seconds} seconds ago`;
}

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
