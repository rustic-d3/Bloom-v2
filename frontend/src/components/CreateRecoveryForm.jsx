import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css";

function CreateRecoveryForm({ route, date, time }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [teacher, setTeacher] = useState(0);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [session_type, setSessionType] = useState("");
  const [repeat_days, setRepeatDays] = useState("");
  const [children, setChildren] = useState([]);
  const [parent, setParent] = useState(null);
  const [classrooms, setClassRooms] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const get_children = async () => {
      try {
        const res = await api.get(`api/get/children/`);
        setChildren(res.data);
      } catch (err) {
        console.log("An error occured!", err);
      }
    };
    get_children();
  }, []);
  console.log("children:", children);

  useEffect(() => {
    const get_classrooms = async () => {
      try {
        const res = await api.get(`api/get/children/courses/`);
        setClassRooms(res.data);
      } catch (err) {
        console.log("An error occured!", err);
      }
    };
    get_classrooms();
  }, []);
  console.log("classrooms:", classrooms);

  function renderBasedOnChild() {
    let childClasses = classrooms.filter((classroom) =>
      classroom.children.some((child) => child.id == selectedChild)
    );
    return childClasses.map((cls) => (
      <option key={cls.id} value={cls.id}>
        {cls.title}
      </option>
    ));
  }
  function addOneHour(timeStr) {
    let [hours, minutes] = timeStr.split(":").map(Number);

    hours = (hours + 1) % 24;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }
  function getDayFromDate(dateStr) {
    const date = new Date(dateStr); // parse "2025-08-15"

    const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

    return days[date.getDay()];
  }

  async function assignChildToClass(child_id, classroom_id) {
    const data = {
      classroom_id: classroom_id,
      child_id: child_id,
    };
    console.log(data);

    try {
      const res = await api.post("api/assign-child-to-class/", data);
      alert(res.data.message);
    } catch (err) {
      console.error("Error assigning child to class:", err);
      alert("An error occurred");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseClassroom = classrooms.find(
        (classroom) => classroom.id == selectedClassroom
      );
      // const child = children.find((child) => child.id == selectedChild);
      const start_hour = time + ":00";
      const end_hour = addOneHour(time) + ":00";
      const repeat_day = getDayFromDate(date);
      const newClassroom = {
        title: baseClassroom.title,
        subject: baseClassroom.subject,
        type: baseClassroom.type,
        start_date: date,
        end_date: date,
        start_time: start_hour,
        end_time: end_hour,
        teacher: baseClassroom.teacher,
        repeat_days: repeat_day,
        session_type: "Recovery",
      };
      console.log("Classroom to send", newClassroom);

      const res = await api.post(route, newClassroom);
      console.log("response:", res.data);
      alert("Recovery set!");
      assignChildToClass(selectedChild, res.data.id);
    } catch (err) {
      console.error("Error creating classroom:", err.response?.data || err);
      alert("An error occurred. Check console for details.");
    }
  };
  console.log("selected child:", selectedChild);

  return (
    <div className="main-container">
      <img src="/bloom-logo.png" alt="logo" className="logo-image" />
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="field">
          <p className="label">Select Child</p>

          <div className="input-field">
            <img src="/images/user.png" alt="" className="icon" />
            <select
              className="form-input"
              value={selectedChild || ""}
              onChange={(e) => setSelectedChild(e.target.value)}
            >
              <option value="" disabled>
                Select a child for recovery
              </option>
              {children.map((child) => {
                return <option value={child.id}>{child.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="field">
          <p className="label">Select Class</p>

          <div className="input-field">
            <img src="/images/user.png" alt="" className="icon" />
            <select
              className="form-input"
              id="selectedClassroom"
              value={selectedClassroom || ""}
              onChange={(e) => {
                setSelectedClassroom(e.target.value);
              }}
            >
              <option value="" disabled>
                Select a class for recovery
              </option>
              {renderBasedOnChild()}
            </select>
          </div>
        </div>
        <div className="buttons">
          <button
            className="appButton form-button"
            onClick={() => navigate("/parentDashboard")}
          >
            Cancel
          </button>
          <button
            className=" appButton form-button"
            type="submit"
            onClick={handleSubmit}
          >
            Set recovery lesson
          </button>
          
        </div>
      </form>
    </div>
  );
}

export default CreateRecoveryForm;
