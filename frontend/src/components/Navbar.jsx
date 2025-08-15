import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem(ACCESS_TOKEN);
  let role = null;
  if (token) {
    try {
      const decoded_token = jwtDecode(token);
      role = decoded_token.role;

    } catch (err) {
      console.error("Invalid token");
    }
  }

  function renderNavigation(role) {
    switch (role) {
      case "admin":
        return (
          <ul>
            <li>
              <a className="link" href="/">
                Admin Dashboard
              </a>
            </li>
            <li>
              <a className="link" href="/createClassroom">
                Create Classroom
              </a>
            </li>
          </ul>
        );
      case "teacher":
        return (
          <ul>
            <li>
              <a className="link" href="/teacherDashboard">
                Dashboard
              </a>
            </li>
            <li>
              <a className="link" href="/availability">
                Availability
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Feedback
              </a>
            </li>
          </ul>
        );
      case "parent":
        return (
          <ul>
            <li>
              <a className="link" href="/parentDashboard">
                Dashboard
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Recovery
              </a>
            </li>
            <li>
              <a className="link" href="#">
                Kid's Feedback
              </a>
            </li>
          </ul>
        );

      default:
        return null;
    }
  }

  return (
    <nav className="navBar">
      <div className="logo">
        <img src="/bloom-logo.png" alt="logo" />
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className={`dynamic-links ${menuOpen ? "active" : ""}`}>
        {renderNavigation(role)}

        <div className="menu-icons">
          <img className="icon" src="/images/mail.png" alt="mail" />
          <a href="/logout" className="logout-btn link">
            Log out
          </a>
          <img src="/images/avatar.png" alt="avatar" className="avatar" />
        </div>
      </div>

      <div className="end-part">
        <img className="icon" src="/images/mail.png" alt="mail" />
        <a className="link" href="/logout">
          Log out
        </a>
        <img src="/images/avatar.png" alt="avatar" className="avatar" />
      </div>
    </nav>
  );
}

export default Navbar;
