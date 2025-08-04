import "../styles/variables.css";
import "../styles/TableContent.css";
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";

function TeachersTableContent({ search }) {
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editedTeacher, setEditedTeacher] = useState(null);
  console.log(editedTeacher);
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

  async function saveEdit() {
    try {
      const { email, ...dataToSend } = editedTeacher;
      const res = await api.patch(
        `api/update/teacher/${editedTeacher.id}/`,
        dataToSend
      );
      console.log(res.status);
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === editedTeacher.id ? editedTeacher : teacher
        )
      );
      setSelected(null);
      setEditedTeacher(null);
    } catch (err) {
      console.log("An error occured", err);
    }
  }

  function handleEditClick(teacher) {
    setSelected(teacher.id);
    setEditedTeacher({ ...teacher });
  }

  function handleInputChange(e, field) {
    setEditedTeacher({ ...editedTeacher, [field]: e.target.value });
  }

  async function handleDelete(teacher) {
    console.log(teacher.id);
    try {
      const res = await api.delete(`api/delete/teacher/${teacher.id}/`);
      setTeachers((prevTeachers) =>
      prevTeachers.filter((t) => t.id !== teacher.id)
    );
      setSelected(null);
      setEditedTeacher(null);
    } catch (err) {
      console.log("An error occured", err);
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
            .map((teacher, index) => {
              const isEditable = teacher.id === selected;
              return (
                <tr key={teacher.email}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      readOnly={!isEditable}
                      value={
                        isEditable ? editedTeacher?.name ?? "" : teacher.name
                      }
                      onChange={(e) => handleInputChange(e, "name")}
                      className={`tableInput ${
                        isEditable ? "editableInput" : ""
                      }`}
                    />
                  </td>
                  <td>{teacher.email}</td>
                  <td>**************</td>
                  <td>
                    <div className="operationButtons">
                      {isEditable ? (
                        <button onClick={() => saveEdit()}>Save</button>
                      ) : (
                        <button onClick={() => handleEditClick(teacher)}>
                          <img src="/images/edit.png" alt="" className="icon" />
                        </button>
                      )}
                      <button onClick={() => handleDelete(teacher)}>
                        <img src="/images/delete.png" alt="" className="icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TeachersTableContent;
