import "../styles/variables.css";
import "../styles/TableContent.css";
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChildrenTableContent({ search }) {
  const [children, setChildren] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editedChild, setEditedChild] = useState(null);
  console.log(editedChild);

  useEffect(() => {
    getChildren();
  }, []);

  async function saveEdit() {
    try {
      const res = await api.put(
        `api/update/child/${editedChild.id}/`,
        editedChild
      );
      setChildren((prevChildren) =>
        prevChildren.map((child) =>
          child.id === editedChild.id ? editedChild : child
        )
      );
      setSelected(null);
      setEditedChild(null);
    } catch (err) {
      console("An error occured", err);
    }
  }
  async function handleDelete(child) {
    console.log(child.id);
    try {
      const res = await api.delete(`api/delete/child/${child.id}/`);
      setChildren((prevParents) =>
      prevParents.filter((c) => c.id !== child.id)
    );
      setSelected(null);
      setEditedChild(null);
    } catch (err) {
      console.log("An error occured", err);
    }
  }

  async function getChildren() {
    try {
      const res = await api.get("api/children/list/");
      setChildren(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching children:", err);
    }
  }
  function handleEditClick(child) {
    setSelected(child.id);
    setEditedChild({ ...child });
  }

  function handleInputChange(e, field) {
    setEditedChild({ ...editedChild, [field]: e.target.value });
  }

  return (
    <div className="container">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Personal Id</th>
            <th>Parent Id</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {children
            .filter((child) =>
              child.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((child, index) => {
              const isEditable = child.id === selected;
              return (
                <tr key={child.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      readOnly={!isEditable}
                      value={isEditable ? editedChild?.name ?? "" : child.name}
                      onChange={(e) => handleInputChange(e, "name")}
                      className={`tableInput ${
                        isEditable ? "editableInput" : ""
                      }`}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      readOnly={!isEditable}
                      value={isEditable ? editedChild?.age ?? "" : child.age}
                      onChange={(e) => handleInputChange(e, "age")}
                      className={`tableInput ${
                        isEditable ? "editableInput" : ""
                      }`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly={!isEditable}
                      value={
                        isEditable
                          ? editedChild?.personal_id ?? ""
                          : child.personal_id
                      }
                      onChange={(e) => handleInputChange(e, "personal_id")}
                      className={`tableInput ${
                        isEditable ? "editableInput" : ""
                      }`}
                    />
                  </td>
                  <td>
                    {child.parent_name}                  
                  </td>
                  <td>
                    <div className="operationButtons">
                      {isEditable ? (
                        <button onClick={() => saveEdit()}>Save</button>
                      ) : (
                        <button onClick={() => handleEditClick(child)}>
                          <img src="/images/edit.png" alt="" className="icon" />
                        </button>
                      )}
                      <button onClick={() => handleDelete(child)}>
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

export default ChildrenTableContent;
