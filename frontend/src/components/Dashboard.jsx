import React from "react";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import Register from "./Register";
import UserList from "./UsersLIst";
import { useNavigate } from "react-router-dom";


function Dashboard() {

    const navigate = useNavigate();

    return (
    <>
        <div className="home">Admin dashboard</div>
        <UserList route = {'api/classrooms/'}></UserList>
        <button onClick={()=>navigate('/register')}>Register user</button>
        <button onClick={()=>navigate('/addChild')}>Add child</button>
        <button onClick={()=>navigate('/createClassroom')}>Create Classroom</button>
    </>
        
    )
}

export default Dashboard;