import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TeacherInfoContainer from "../components/TeacherInfoContainer";
import "../styles/TeacherDashboardPage.css";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

function TeacherDashboard() {
  const [userId, setUserId] = useState(null);
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const getUserId = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log(decoded);
          setUserId(decoded.user_id);
        } catch (err) {
          console.log("an error occured");
        }
      }
    };

    getUserId();
  }, []);
  useEffect(() => {
    const getTeacher = async () => {
      if (!userId) return; 
      try {
        const res = await api.get(`api/get/teacher/${userId}/`);
        setTeacher(res.data);
        console.log("Teacher data:", res.data);
      } catch (err) {
        console.error("An error occurred fetching teacher:", err);
      }
    };

    getTeacher();
  }, [userId]);

  return (
    <>
      <Navbar></Navbar>
      <div className="container main-section">
        <div className="hero">
          <TeacherInfoContainer teacher={teacher} />
        </div>

        <div className="classRooms">
          <div className="classRoom"></div>
          <div className="classRoom"></div>
          <div className="classRoom"></div>
          <div className="classRoom"></div>
          <div className="classRoom"></div>
          
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
