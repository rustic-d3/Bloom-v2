import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";

function ClassRoomForm({ route }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("")
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
        subject,
        type,
        teacher,
        start_date,
        end_date,
        start_time,
        end_time
      );

      const res = await api.post(route, {
        title,
        subject,
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
      <select
        className="form-input"
        id="title"
        value={title || ""}
        onChange={(e) => setTitle(e.target.value)}
      >
        <option value="" disabled>
          Select a class title
        </option>
        <option value="Alfabetizare Digitală">Alfabetizare Digitală</option>
        <option value="Introducere în Programare">Intro. Coding</option>
        <option value="M1 - Introducere în Programare">M1 - Introducere în Programare</option>
        <option value="M2 - Avansarea în programare (Delightex) ">M2 - Avansarea în programare (Delightex) </option>
        <option value="M3 - Programare VR/AR (Delightex)">M3 - Programare VR/AR (Delightex)</option>
        <option value="M4 - Programare Python în Delightex">M4 - Programare Python în Delightex</option>
        <option value="M5 - Introducere în Minecraft Education">M5 - Introducere în Minecraft Education</option>
        <option value="M6 - Avansare în Minecraft Education">M6 - Avansare în Minecraft Education</option>
        <option value="M7 - Introducere În Roblox LUA">M7 - Introducere În Roblox LUA</option>
        <option value="M8 - Roblox Lua">M8 - Roblox Lua</option>
        <option value="M9 - Roblox Lua">M9 - Roblox Lua</option>
        <option value="M10 - Roblox Lua">M10 - Roblox Lua</option>
        <option value="M11 - Roblox Lua">M11 - Roblox Lua</option>
        <option value="M12 - Roblox Lua">M12 - Roblox Lua</option>
      </select>
      <select
        className="form-input"
        id="subject"
        value={subject || ""}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="" disabled>
          Select a class subject
        </option>
        <option value="Alfabetizare Digitală">Alfabetizare Digitală</option>
        <option value="Intro. Coding">Intro. Coding</option>
        <option value="M1">M1</option>
        <option value="M2">M2</option>
        <option value="M3">M3</option>
        <option value="M4">M4</option>
        <option value="M5">M5</option>
        <option value="M6">M6</option>
        <option value="M7">M7</option>
        <option value="M8">M8</option>
        <option value="M9">M9</option>
        <option value="M10">M10</option>
        <option value="M11">M11</option>
        <option value="M12">M12</option>
      </select>
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
