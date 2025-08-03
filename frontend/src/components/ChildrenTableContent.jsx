import "../styles/variables.css";
import "../styles/TableContent.css";
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";

function ChildrenTableContent() {
  const [children, setChildren] = useState([]);
  useEffect(() => {
          getChildren();      
      }, []);

  async function getChildren() {
    try {
      const res = await api.get("api/children/list/");
      setChildren(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching children:", err);
    }
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
          {children.map((children, index) => (
            <tr key={children.name}>
              <td>{index+1}</td>
              <td>{children.name}</td>
              <td>{children.age} ani</td>
              <td>{children.personal_id}</td>
              <td>{children.parent_name}</td>
              <td><div className="operationButtons">
                <button><img src="/images/edit.png" alt="" className="icon" /></button>
                <button><img src="/images/delete.png" alt="" className="icon" /></button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChildrenTableContent;
