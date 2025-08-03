import "../styles/variables.css";
import "../styles/TableContent.css";
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";

function ChildrenTableContent({ search }) {
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
  console.log(search);

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
            .map((child, index) => (
              <tr key={child.name}>
                <td>{index + 1}</td>
                <td>{child.name}</td>
                <td>{child.age} ani</td>
                <td>{child.personal_id}</td>
                <td>{child.parent_name}</td>
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

export default ChildrenTableContent;
