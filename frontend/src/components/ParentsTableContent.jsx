import "../styles/variables.css";
import "../styles/TableContent.css";
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";

function ParentsTableContent({ search }) {
  const [parents, setparents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editedParent, setEditedParent] = useState(null);
  console.log(editedParent);
  useEffect(() => {
    getParents();
  }, []);

  async function getParents() {
    try {
      const res = await api.get("api/user/parents/list/");
      setparents(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }
    async function handleDelete(parent) {
    console.log(parent.id);
    try {
      const res = await api.delete(`api/delete/parent/${parent.id}/`);
      setparents((prevParents) =>
      prevParents.filter((p) => p.id !== parent.id)
    );
      setSelected(null);
      setEditedParent(null);
    } catch (err) {
      console.log("An error occured", err);
    }
  }

  async function saveEdit() {
    try {
       const { email, ...dataToSend } = editedParent;
      const res = await api.patch(
        `api/update/parent/${editedParent.id}/`,
        dataToSend
      );
      console.log(res.status)
      setparents((prevParents) =>
        prevParents.map((parent) =>
          parent.id === editedParent.id ? editedParent : parent
        )
      );
      setSelected(null);
      setEditedParent(null);
    } catch (err) {
      console.log("An error occured", err);
    }
  }

  function handleEditClick(parent) {
    setSelected(parent.id);
    setEditedParent({ ...parent });
  }

  function handleInputChange(e, field) {
    setEditedParent({ ...editedParent, [field]: e.target.value });
  }

  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {parents
            .filter((parent) => {
              const fullName =
                `${parent.firstName} ${parent.lastName}`.toLowerCase();
              return fullName.includes(search.toLowerCase());
            })
            .map((parent) => {
              const isEditable = parent.id === selected;
              return (
                <tr key={parent.id}>
                  <td>{parent.id}</td>
                  <td><input
                      type="text"
                      readOnly={!isEditable}
                      value={isEditable ? editedParent?.firstName ?? "" : parent.firstName}
                      onChange={(e) => handleInputChange(e, "firstName")}
                      className={`tableInput ${
                        isEditable ? "editableInput" : ""
                      }`}
                    /></td>
                  <td><input
                      type="text"
                      readOnly={!isEditable}
                      value={isEditable ? editedParent?.lastName ?? "" : parent.lastName}
                      onChange={(e) => handleInputChange(e, "lastName")}
                      className={`tableInput ${
                        isEditable ? "editableInput" : ""
                      }`}
                    /></td>
                  <td>{parent.email}</td>
                  <td><input
                      type="number"
                      readOnly={!isEditable}
                      value={isEditable ? editedParent?.phone ?? "" : parent.phone}
                      onChange={(e) => handleInputChange(e, "phone")}
                      className={`tableInput ${
                        isEditable ? "editableInput" : ""
                      }`}
                    /></td>
                  <td>**************</td>
                  <td>
                    <div className="operationButtons">
                      {isEditable ? (
                        <button onClick={() => saveEdit()}>Save</button>
                      ) : (
                        <button onClick={() => handleEditClick(parent)}>
                          <img src="/images/edit.png" alt="" className="icon" />
                        </button>
                      )}
                      <button onClick={() => handleDelete(parent)}>
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

export default ParentsTableContent;
