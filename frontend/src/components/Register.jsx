import React from "react";
import Form from "./Form";

function Register() {
    return(
        <div className="register">
            <Form route ={'/api/user/register/'} method={'Register'}></Form>
        </div>
    )
}

export default Register;