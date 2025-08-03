import React from "react";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import UserList from "../components/UsersLIst";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TeachersTableContent from "../components/TeachersTableContent";
import "../styles/AdminDashboardPage.css";

function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="heading">
          <div className="tabs">
            <ul>
              <li>
                <a href="#" className="link">
                  Instructors
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Parents
                </a>
              </li>
              <li>
                <a href="#" className="link">
                  Childrens
                </a>
              </li>
            </ul>
          </div>
          <div className="operations">
            <div className="inputField">
              <img src="/images/search.png" alt="icon" className="icon" />
              <input type="text" name="" id="" />
            </div>
            <button className="search-button">Add new</button>
          </div>
        </div>
        <TeachersTableContent/>
      </div>
    </>
  );
}

export default AdminDashboardPage;
