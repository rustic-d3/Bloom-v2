import React from "react";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import Register from "./Register";


function Dashboard() {

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return <div>Please log in to access the dashboard.</div>;
    }

    return (
    <>
        <div className="home">dashboard</div>
        <Register />
    </>
        
    )
}

export default Dashboard;