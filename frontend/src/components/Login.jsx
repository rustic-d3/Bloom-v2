import React from "react";
import Form from "./Form";

function Login() {
    return(
        <div className="login">
            <Form route ={'/api/token/'} method={'Login'}></Form>
        </div>
    )
}

export default Login;