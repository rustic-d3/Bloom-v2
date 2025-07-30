import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"; // Assuming you have a CSS file for styling

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("teacher");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "Login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = null;
      if (name === "Login") {
        res = await api.post(route, { username, password });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        if (role === "parent") {
          console.log(
            username,
            password,
            role,
            firstName,
            lastName,
            email,
            phone
          );
          res = await api.post(route, {
            username,
            password,
            role,
            firstName,
            lastName,
            email,
            phone,
          });
          alert("Registration successful! You can now log in.");
          navigate("/login");
        }
      }
    } catch (error) {
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>

      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="enter your username..."
      />

      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter your password..."
      />
      {method === "Register" && (
        <div>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email..."
          />
          <select
            className="form-select"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="teacher">teacher</option>
            <option value="parent">parent</option>
            <option value="admin">admin</option>
          </select>
        </div>
      )}

      {role === "parent" && (
        <div>
          <input
            type="text"
            className="form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="enter first name..."
          />
          <input
            type="text"
            className="form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="enter last name..."
          />
          <input
            type="tel"
            className="form-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="enter parent phone..."
          />
        </div>
      )}

      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default Form;
