import { use } from "react";
import React, { useEffect } from "react";
import api from "../api";
import { all } from "axios";

function UserList({route}){
    const [users, setUsers] = React.useState([]);
    useEffect(() => {
        getUsers();
        
        
    }, []);

    async function getUsers() {
        try{
            const res = await api.get(route)
            setUsers(res.data);
            console.log(res.data);

        }catch(err) {
            console.error("Error fetching users:", err);
        }
        
        
    }

    return (
        <div>
        <h1>User List</h1>
        
        </div>
    );
}

export default UserList;