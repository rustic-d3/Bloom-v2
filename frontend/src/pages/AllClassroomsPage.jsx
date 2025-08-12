import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import GroupCard from "../components/GroupCard";
import api from "../api";

function AllClassroomsPage() {
  const [classrooms, setClassrooms] = useState([]);
  const location = useLocation();
  const { child } = location.state || {};
  console.log('_________child_id________: ', child.id)

  useEffect(() => {
    async function sendData() {
      try {
        const res = await api.get("api/get/all-classrooms/");

        setClassrooms(res.data);
      } catch (err) {
        alert("An error occured!");
        console.log("error: ", err);
      }
    }

    sendData()
  }, []);



  return (
    <>
      {classrooms.map((classroom) => {
        return <GroupCard key={classroom.id} classroom={classroom} child_id={child.id} />;
      })}
    </>
  );
}

export default AllClassroomsPage;
