import React from "react";

export default function Countdown({ currentTime, gpDate, gpTime }) {
  const newDate = new Date(gpDate + "T" + gpTime).getTime();

  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  if (newDate <= currentTime) {
    return <div>Finished!</div>;
  }

  const diff = newDate - currentTime;

  const diffDays = Math.floor(diff / days);
  const diffHours = Math.floor((diff % days) / hours);
  const diffMinutes = Math.floor((diff % hours) / minutes);
  const diffSeconds = Math.floor((diff % minutes) / seconds);

  return (
    <div>
      {diffDays}d {diffHours}h {diffMinutes}m {diffSeconds}s
    </div>
  );
}
