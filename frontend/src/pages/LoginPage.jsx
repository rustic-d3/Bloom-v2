import "../styles/LoginPage.css";
import Form from "../components/Form";

function LoginPage() {
  return (
    <div className="login-body">
      <div className="decorator-1"></div>
      <div className="decorator-2"></div>
      <div className="decorator-3"></div>
      <div className="decorator-4"></div>
      <div className="decorator-5"></div>
      <div className="decorator-6"></div>
      <div className="decorator-7"></div>
      <div className="decorator-8"></div>
      <Form route={"/api/token/"} method={"Login"}></Form>
    </div>
  );
}

export default LoginPage;
