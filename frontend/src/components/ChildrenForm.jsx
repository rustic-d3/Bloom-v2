import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";

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
        parent_name
      });
      navigate("/")
    } catch (err) {
      alert("An error occured", err);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter child's name"
      />
      <input
        className="form-input"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter child's age"
      />
      <input
        className="form-input"
        type="text"
        value={personal_id}
        onChange={(e) => setPersonalId(e.target.value)}
        placeholder="Enter child's personal id"
      />
      <select
        className="form-input"
        id="parent_name"
        value={parent_name || ""}
        onChange={(e) => setParentName(e.target.value)}
      >
        <option value="" disabled>Select a parent</option>
        {parents.map((parent) => (
          <option key={parent.id} value={parent.id}>
            {parent.firstName} {parent.lastName}
          </option>
        ))}
      </select>
      <button className="form-button" type="submit">Add child</button>
    </form>
  );
}

export default ChildrenForm;
