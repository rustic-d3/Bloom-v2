import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TeacherInfoContainer from "../components/TeacherInfoContainer";
import "../styles/TeacherDashboardPage.css";
import api from "../api";

function TeacherDashboard() {
  const [teacher, setTeacher] = useState([]);

  useEffect(async () => {
    const res = await api.get()



  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container main-section">
        <div className="hero">
          <TeacherInfoContainer />
        </div>

        <div className="classes">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          nesciunt, eligendi, facere reiciendis, dolorum repellat ipsam ullam
          autem numquam culpa quidem cupiditate incidunt nobis doloribus et
          deserunt. Eveniet, inventore laboriosam.
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
