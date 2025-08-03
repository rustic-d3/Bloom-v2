import "../styles/variables.css";
import "../styles/TableContent.css";
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";

function ParentsTableContent({ search }) {
  const [parents, setparents] = useState([]);
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
            .map((parent) => (
              <tr key={parent.id}>
                <td>{parent.id}</td>
                <td>{parent.firstName}</td>
                <td>{parent.lastName}</td>
                <td>{parent.email}</td>
                <td>{parent.phone}</td>
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

export default ParentsTableContent;
