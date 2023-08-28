import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const login = async (body) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        body
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    login(body);
    e.target.email.value = "";
    e.target.password.value = "";
  }

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []); //eslint-disable-line
  return (
    <div className="auth-form-container">
      <h3>Please Login</h3>
      <div className="form">
        <form
          method="POST"
          action=""
          className="login-form"
          onSubmit={handleSubmit}
        >
          <input type="email" placeholder="Enter Email" name="email" required />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
          <button type="submit" className="btn sign-in-btn ">
            SignIn
          </button>
        </form>
        <div className="bottom-txt">
          <p className="message">
            Not registered?{" "}
            <Link to="/register" className="link-txt">
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
