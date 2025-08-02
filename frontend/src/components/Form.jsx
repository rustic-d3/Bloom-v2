import { use, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import { jwtDecode } from "jwt-decode";
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
            <div className="field">
              <p className="label">Parent's First Name</p>
              <div className="input-field">
                <img className="icon" src="/images/arrow-down.png" alt="" />
                <input
                  type="text"
                  className="form-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="enter first name..."
                />
              </div>
            </div>

            <div className="field">
              <p className="label">Parent's Last Name</p>
              <div className="input-field">
                <img src="/images/arrow-down.png" alt="user" className="icon" />
                <input
                  type="text"
                  className="form-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="enter last name..."
                />
              </div>
            </div>

            <div className="field">
              <p className="label">Parent's Phone Number</p>
              <div className="input-field">
                <img src="/images/phone-icon.png" alt="icon" className="icon" />
                <input
                  type="tel"
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="enter parent's phone..."
                />
              </div>
            </div>
          </>
        );
      case "teacher":
        return (
          <>
            <div className="field">
              <p className="label">Instructor's Full Name</p>
              <div className="input-field">
                <img src="images/arrow-down.png" alt="icon" className="icon" />
                <input
                  className="form-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="enter Instructor's name"
                />
              </div>
            </div>
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
        const token = localStorage.getItem(ACCESS_TOKEN)
        const role = jwtDecode(token).role
        switch(role){
          case "admin":
            navigate('/');
            break;
          case "teacher":
            navigate("/teacherDashboard")
          break;
          case "parent":
            navigate("/parentDashboard")
          break;
        }
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
        if (role === "teacher") {
          console.log(username, password, email, role, name);
          res = await api.post(route, {
            username,
            password,
            email,
            role,
            name,
          });
          navigate("/login");
        }
        if (role === "admin") {
          console.log(username, password, email, role);
          res = await api.post(route, {
            username,
            password,
            email,
            role,
          });
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("Error creating classroom:", err.response?.data || err);
      alert("An error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <img className="logo-image" src="/bloom-logo.png" alt="asdg" />
      <form onSubmit={handleSubmit} className="form-container">
        <h1>{method_name}</h1>
        <div className="field">
          <p className="label">username</p>
          <div className="input-field">
            <img className="icon" src="/images/user.png" alt="adsf" />
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="enter username..."
            />
          </div>
        </div>

        <div className="field">
          <p className="label">password</p>

          <div className="input-field">
            <img className="icon" src="/images/lock.png" alt="adsf" />
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password..."
            />
          </div>
        </div>

        {method === "Register" && (
          <>
            <div className="field">
              <p className="label">email</p>

              <div className="input-field">
                <img className="icon" src="/images/mail.png" alt="adsf" />
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email..."
                />
              </div>
            </div>

            <div className="field">
              <p className="label role-label">select role:</p>
              <div className="input-field">
                <img className="icon" src="/images/roles.png" alt="adsf" />
                <select
                  className="form-input select-input"
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
            </div>

            {renderFields(role)}
          </>
        )}
        <button className=" btn form-button" type="submit">
          {method_name}
        </button>
      </form>
    </div>
  );
}

export default Form;
