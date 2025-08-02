import React from "react";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import UserList from "../components/UsersLIst";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminDashboardPage() {

    const navigate = useNavigate();

    return (
    <>
        <Navbar></Navbar>
        <div className="home">Admin dashboard</div>
        <UserList route = {'api/classrooms/'}></UserList>
        <button onClick={()=>navigate('/register')}>Register user</button>
        <button onClick={()=>navigate('/addChild')}>Add child</button>
    </>
        
    )
}

export default AdminDashboardPage;