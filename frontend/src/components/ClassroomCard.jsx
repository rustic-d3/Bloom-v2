import React from "react";
import "../styles/ClassroomCard.css";
import { useState, useEffect } from "react";

export default function ClassroomCard({ session }) {
  function getCountdown(dateString, timeString) {
    const targetDate = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return [days, hours, minutes, seconds];
  }
  function to12HourFormat(timeString) {
    const [hourStr, ,] = timeString.split(":");
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour} ${ampm}`;
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dateObj = new Date(session.date);
  const dayName = days[dateObj.getDay()];
  const date = dateObj.getDate();
  const time = to12HourFormat(session.classRoom.start_time);
  const [count, setCount] = useState(getCountdown(session.date, session.classRoom.start_time));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(getCountdown(session.date, session.classRoom.start_time));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [session.date, session.classRoom.start_time]);
  

  return (
    <div className="classroom-container">
      <div className="class-card">
        <div className="class-header">{session.classRoom.title}</div>

        <div className="class-info">
          <div className="circle">{dayName + " " + date}</div>
          <div className="circle">{time}</div>
          <div className="circle">{session.classRoom.type}</div>
        </div>

        <div className="student-lists">
          <ul>
            <li>Kid 1 <button className="alarmButton"><img src="/images/alert.png" alt="" /></button></li> 
            <li>Kid 2 <button className="alarmButton"><img src="/images/alert.png" alt="" /></button></li>
            <li>Kid 3 <button className="alarmButton"><img src="/images/alert.png" alt="" /></button></li>
          </ul>
          <ul>
            <li>Kid 4 <button className="alarmButton"><img src="/images/alert.png" alt="" /></button></li>
            <li>Kid 5 <button className="alarmButton"><img src="/images/alert.png" alt="" /></button></li>
            <li>Kid 6 <button className="alarmButton"><img src="/images/alert.png" alt="" /></button></li>
          </ul>
        </div>

        <div className="countdown">
          <span>
            { count[0]} <small>Days</small>
          </span>
          <span>
            {count[1]} <small>Hours</small>
          </span>
          <span>
            {count[2]} <small>Minutes</small>
          </span>
          <span>
            {count[3]} <small>Seconds</small>
          </span>
        </div>

        <div className="buttons">
          <button
            className="enter-btn"
            onClick={() => {
              window.open(session.meetUrl, "_blank", "noopener,noreferrer");
            }}
          >
            Enter
          </button>
          <button className="replace-btn">Replacement</button>
        </div>
      </div>
    </div>
  );
}
