import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";

function ClassRoomForm({ route }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [teacher, setTeacher] = useState(0);
  const [allTeachers, setAllTeachers] = useState([]);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const navigate = useNavigate();

  async function getTeachers() {
    try {
      const response = await api.get("api/user/teachers/list/");
      setAllTeachers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  }

  useEffect(() => {
    getTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        title,
        type,
        teacher,
        start_date,
        end_date,
        start_time,
        end_time
      );

      const res = await api.post(route, {
        title,
        type,
        teacher,
        start_date,
        end_date,
        start_time,
        end_time,
      });

      navigate("/");
    } catch (err) {
      console.error("Error creating classroom:", err.response?.data || err);
      alert("An error occurred. Check console for details.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Class Room title"
      />
      <select
        className="form-input"
        id="type"
        value={type || ""}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="" disabled>
          Select a class type
        </option>
        <option value="Ro">Ro</option>
        <option value="En">En</option>
        <option value="Ro/En">Ro/En</option>
      </select>
      <select
        className="form-input"
        id="teacher"
        value={teacher || ""}
        onChange={(e) => setTeacher(Number(e.target.value))}
      >
        <option value="" disabled>
          Select a classroom teacher
        </option>
        {allTeachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={start_date}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={end_date}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        type="time"
        value={start_time}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={end_time}
        onChange={(e) => setEndTime(e.target.value)}
      />

      <button className="form-button" type="submit">
        Create classroom
      </button>
    </form>
  );
}

export default ClassRoomForm;
