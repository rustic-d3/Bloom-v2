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
  const [classRooms, setClassRooms] = useState([])

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
  useEffect(() => {
    const getClassrooms = async () => {
      if (!userId) return; 
      try {
        const res = await api.get('api/get/classrooms/');
        setClassRooms(res.data);
        console.log("Class Rooms data:", res.data);
      } catch (err) {
        console.error("An error occurred fetching classRooms:", err);
      }
    };

    getClassrooms();
    console.log( "classrooms:", classRooms)
  }, [userId]);

  return (
    <>
      <Navbar></Navbar>
      <div className="container main-section">
        <div className="hero">
          <TeacherInfoContainer teacher={teacher} />
        </div>

        <div className="classRooms">
          {classRooms.map((session)=>{
            return (<div key={session.id} className="classRoom">
              <div className="title">
                {session.classRoom.title}
              </div>
              <div className="date">
                {session.date}
              </div>
            </div>)
          }
        )}
          
          
          
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
