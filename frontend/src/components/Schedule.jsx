import { useNavigate } from "react-router-dom";
import "../styles/Schedule.css";
import api from "../api";
import { useState } from "react";

export default function Schedule() {
  const days = [
    { label: "M", code: "MON" },
    { label: "T", code: "TUE" },
    { label: "W", code: "WED" },
    { label: "T", code: "THU" },
    { label: "F", code: "FRI" },
    { label: "S", code: "SAT" },
    { label: "S", code: "SUN" },
  ];

  const [availability, setAvailability] = useState(
    days.map((day) => ({
      week_day: day.code,
      slots: [{ start_time: "", end_time: "" }], // each day starts with one slot
    }))
  );

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(0); 
  };

  const handleTimeChange = (dayIndex, slotIndex, field, value) => {
    const updated = [...availability];
    updated[dayIndex].slots[slotIndex][field] = value;
    setAvailability(updated);
  };

  const handleAddSlot = (dayIndex) => {
    const updated = [...availability];
    updated[dayIndex].slots.push({ start_time: "", end_time: "" });
    setAvailability(updated);
  };

  const handleRemoveSlot = (dayIndex, slotIndex) => {
    const updated = [...availability];
    updated[dayIndex].slots.splice(slotIndex, 1);
    setAvailability(updated);
  };

  const handleSubmit = async () => {
    try {
      const payload = availability.flatMap((day) =>
        day.slots
          .filter((slot) => slot.start_time && slot.end_time)
          .map((slot) => ({
            week_day: day.week_day,
            start_time: slot.start_time,
            end_time: slot.end_time,
          }))
      );
      console.log(payload);
      const res = await api.post("api/availabilities/create/", payload);
      console.log("Saved:", res.data);
      navigate('/TeacherDashboard')
    } catch (err) {
      console.log("An error has occurred!", err);
    }
  };

  return (
    <div className="availability-schedule-container">
      {availability.map((day, dayIndex) => (
        <div className="availability-schedule-time-field" key={dayIndex}>
          <div className="availability-schedule-circle">
            {days[dayIndex].label}
          </div>

          <div className="availability-schedule-time-input">
            {day.slots.map((slot, slotIndex) => (
              <div
                key={slotIndex}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="time"
                  value={slot.start_time}
                  onChange={(e) =>
                    handleTimeChange(
                      dayIndex,
                      slotIndex,
                      "start_time",
                      e.target.value
                    )
                  }
                />
                <span></span>
                <input
                  type="time"
                  value={slot.end_time}
                  onChange={(e) =>
                    handleTimeChange(
                      dayIndex,
                      slotIndex,
                      "end_time",
                      e.target.value
                    )
                  }
                />

                <button
                  className="availability-schedule-option-btn"
                  onClick={() => handleRemoveSlot(dayIndex, slotIndex)}
                >
                  <img
                    src="/images/x.png"
                    alt="remove"
                    className="availability-schedule-icon"
                  />
                </button>
                <button
                  className="availability-schedule-option-btn"
                  onClick={() => handleAddSlot(dayIndex)}
                >
                  <img
                    src="/images/plus_circle.png"
                    alt="add"
                    className="availability-schedule-icon"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="sendButtons">
        <button className="sendButton" onClick={handleCancel}>
          Cancel
        </button>
        <button className="sendButton" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}
