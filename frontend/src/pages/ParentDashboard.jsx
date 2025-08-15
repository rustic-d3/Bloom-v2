import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TeacherInfoContainer from "../components/TeacherInfoContainer";
import "../styles/TeacherDashboardPage.css";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ClassroomCard from "../components/ClassroomCard";

export default function parentDashboard() {
  const [userId, setUserId] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [parent, setParent] = useState(null);
  const [isTeacherAccount, setIsTeacherAccount] = useState(null);
  const [classRooms, setClassRooms] = useState([]);
 

  useEffect(() => {
    const getUserId = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log(decoded);
          setUserId(decoded.user_id);
          decoded.role == 'teacher'? setIsTeacherAccount(true) : setIsTeacherAccount(false)
        } catch (err) {
          console.log("an error occured");
        }
      }
    };

    getUserId();
  }, []);
  useEffect(() => {
    const getTeachers = async () => {
      if (!userId) return; 
      try {
        const res = await api.get(`api/allTeachers/view/`);
        setTeachers(res.data);
        console.log("Teachers data:", res.data);
      } catch (err) {
        console.error("An error occurred fetching teachers:", err);
      }
    };

    getTeachers();
  }, [userId]);
  useEffect(() => {
    const getClassrooms = async () => {
      if (!userId) return; 
      try {
        const res = await api.get('api/get/children/classrooms/');
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
            {teachers.map((teacher)=>{
                return(<TeacherInfoContainer key={teacher.id} teacher={teacher} isTeacherAccount={isTeacherAccount} />)
                
            })}
        </div>

        <div className="classRooms">
          {classRooms.map((session)=>{
            return (
              <ClassroomCard key={session.id} session={session} />
            )
          }
        )}    
        </div>
      </div>
    </>
  );
}


