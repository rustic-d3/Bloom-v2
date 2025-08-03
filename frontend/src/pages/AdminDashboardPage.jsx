import React, { use, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import UserList from "../components/UsersLIst";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TeachersTableContent from "../components/TeachersTableContent";
import "../styles/AdminDashboardPage.css";
import ParentsTableContent from "../components/ParentsTableContent";
import ChildrenTableContent from "../components/ChildrenTableContent";

function AdminDashboardPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("teachers")
  const [search, setSearch] = useState("")
  

  function goTo(){
    if (activeTab == "children"){
        navigate('/addChild')    
    }
    else if(activeTab == "teachers" || activeTab == "parents"){
        navigate('/register')    
    }
  }



  function renderTable(activeTab){
    if (activeTab == "children"){
        return(
            <ChildrenTableContent search = {search}/>
        )
    }
    else if(activeTab == "teachers"){
        return(
            <TeachersTableContent search = {search}/>
        )
    }
    else if(activeTab == "parents"){
        return(
            <ParentsTableContent search = {search}/>
        )   
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="heading">
          <div className="tabs">
            <ul>
              <li>
                <a href="#" className="link" onClick={()=> setActiveTab("teachers")}>
                  Teachers
                </a>
              </li>
              <li>
                <a href="#" className="link" onClick={()=> setActiveTab("parents")} >
                  Parents
                </a>
              </li>
              <li>
                <a href="#" className="link" onClick={()=> setActiveTab("children")}>
                  Childrens
                </a>
              </li>
            </ul>
          </div>
          <div className="operations">
            <div className="inputField">
              <img src="/images/search.png" alt="icon" className="icon" />
              <input type="text" name="" id="" placeholder="Search by name" onChange={(e)=>setSearch(e.target.value)} />
            </div>
            <button className="search-button" onClick={()=>goTo()}>Add new</button>
          </div>
        </div>
        {renderTable(activeTab)}
      </div>
    </>
  );
}

export default AdminDashboardPage;
