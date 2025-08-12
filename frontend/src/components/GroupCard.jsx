import React from "react";
import "../styles/ClassroomCard.css";
import { useState, useEffect } from "react";
import api from "../api";

export default function GroupCard({ classroom, child_id }) {
  async function assignChildToClass() {
    const data = {
      classroom_id: classroom.id,
      child_id: child_id,
    };

    try {
      const res = await api.post("api/assign-child-to-class/", data);
      alert(res.data.message);
    } catch (err) {
      console.error("Error assigning child to class:", err);
      alert("An error occurred");
    }
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

  const dateObj = new Date(classroom.start_date);
  const dayName = days[dateObj.getDay()];
  const date = dateObj.getDate();
  const time = to12HourFormat(classroom.start_time);

  return (
    <div className="classroom-container">
      <div className="class-card">
        <div className="class-header">{classroom.title} - teacher ID = {classroom.teacher}</div>

        <div className="class-info">
          <div className="circle">{dayName + " " + date}</div>
          <div className="circle">{time}</div>
          <div className="circle">{classroom.type}</div>
        </div>

        <div className="student-lists">
          <ul>
            {classroom.children.slice(0, 3).map((child) => (
              <li key={child.id}>
                {child.name}{" "}
                <button className="alarmButton">
                  <img src="/images/alert.png" alt="" />
                </button>
              </li>
            ))}
          </ul>
          <ul>
            {classroom.children.slice(3, 6).map((child) => (
              <li key={child.id}>
                {child.name}{" "}
                <button className="alarmButton">
                  <img src="/images/alert.png" alt="" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons">
          <button
            className="enter-btn"
            onClick={() => {
              assignChildToClass();
            }}
          >
            AssignToClass
          </button>
        </div>
      </div>
    </div>
  );
}
