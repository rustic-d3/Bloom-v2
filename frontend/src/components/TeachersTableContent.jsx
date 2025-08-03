import "../styles/variables.css";
import "../styles/TableContent.css";
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";

function TeachersTableContent({ search }) {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    getTeachers();
  }, []);

  async function getTeachers() {
    try {
      const res = await api.get("api/user/teachers/list/");
      setTeachers(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {teachers
            .filter((teacher) =>
              teacher.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((teacher, index) => (
              <tr key={teacher.email}>
                <td>{index + 1}</td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>**************</td>
                <td>
                  <div className="operationButtons">
                    <button>
                      <img src="/images/edit.png" alt="" className="icon" />
                    </button>
                    <button>
                      <img src="/images/delete.png" alt="" className="icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeachersTableContent;
