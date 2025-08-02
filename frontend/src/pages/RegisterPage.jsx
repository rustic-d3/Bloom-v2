import React from "react";
import Form from "../components/Form";

function RegisterPage() {
    return(
        <div className="register">
            <Form route ={'/api/user/register/'} method={'Register'}></Form>
        </div>
    )
}

export default RegisterPage;