import React from "react";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import "../styles/RegisterPage.css";

function RegisterPage() {
  return (
    <>
      <Navbar></Navbar>

      <div className="form-layout-container">
        <Form route={"/api/user/register/"} method={"Register"}></Form>
      </div>
    </>
  );
}

export default RegisterPage;
