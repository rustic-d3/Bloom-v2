import { use, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
// Assuming you have a CSS file for styling

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("teacher");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function renderFields(role) {
    switch (role) {
      case "parent":
        return (
          <>
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
          </>
        );
      case "teacher":
        return (
          <>
            <input 
            className="form-input"
            type="text" 
            value={name} 
            onChange={(e)=> setName(e.target.value)}
            placeholder="enter Instructor's name" />
          </>
        );
    }
  }

  const method_name = method === "Login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res = null;
      if (method_name === "Login") {
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
        if (role === "teacher"){
          console.log(
            username,
            password,
            email,
            role,
            name
          )
          res = await api.post(route, {
            username,
            password,
            email,
            role,
            name
          })
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
      <h1>{method_name}</h1>

      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="enter username..."
      />

      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password..."
      />
      {method === "Register" && (
        <>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email..."
          />
          <select
            className="form-input"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="teacher">teacher</option>
            <option value="parent">parent</option>
            <option value="admin">admin</option>
          </select>
          {renderFields(role)}
        </>

      )}
      <button className="form-button" type="submit">
        {method_name}
      </button>
    </form>
  );
}

export default Form;
