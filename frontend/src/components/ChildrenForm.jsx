import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css";

function ChildrenForm({ route }) {
  const [name, setName] = useState("");
  const [parents, setParents] = useState([]);
  const [age, setAge] = useState(0);
  const [personal_id, setPersonalId] = useState("");
  const [parent_name, setParentName] = useState(null);

  const navigate = useNavigate();

  async function getParents() {
    try {
      const response = await api.get("api/user/parents/list/");
      setParents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching parents:", error);
    }
  }

  useEffect(() => {
    getParents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(route, {
        name,
        age,
        personal_id,
        parent_name,
      });
      alert("All good!")
      navigate("/");
    } catch (err) {
      alert("An error occured", err);
    }
  };

  return (
    <div className="main-container">
      <img className="logo-image" src="/bloom-logo.png" alt="" />

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="field">
          <p className="label">Child's Name</p>

          <div className="input-field">
            <img src="/images/arrow-down.png" alt="" className="icon" />
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter child's name"
            />
          </div>
        </div>
        <div className="field">
          <p className="label">Child's Age</p>

          <div className="input-field">
            <img src="/images/age.png" alt="" className="icon" />
            <input
              className="form-input"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter child's age"
            />
          </div>
        </div>

        <div className="field">
          <p className="label">Child's Personal Id</p>

          <div className="input-field">
            <img src="/images/face-id.png" alt="" className="icon" />
            <input
              className="form-input"
              type="text"
              value={personal_id}
              onChange={(e) => setPersonalId(e.target.value)}
              placeholder="Enter child's personal id"
            />
          </div>
        </div>
        <div className="field">
          <p className="label">Parent's Name</p>

          <div className="input-field">
            <img src="/images/arrow-down.png" alt="" className="icon" />
            <select
          className="form-input"
          id="parent_name"
          value={parent_name || ""}
          onChange={(e) => setParentName(e.target.value)}
        >
          <option value="" disabled>
            Select a parent
          </option>
          {parents.map((parent) => (
            <option key={parent.id} value={parent.id}>
              {parent.firstName} {parent.lastName}
            </option>
          ))}
        </select>
          </div>
        </div>
        <button className=" appButton form-button" type="submit">
          Add child
        </button>
      </form>
    </div>
  );
}

export default ChildrenForm;
