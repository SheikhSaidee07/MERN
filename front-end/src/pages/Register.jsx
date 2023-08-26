import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function SignUp() {
  const navigate = useNavigate();

  /*  Swal.fire({
    title: <strong>Good job!</strong>,
    html: <i>You clicked the button!</i>,
    icon: "success",
  }); */

  const register = async (body) => {
    let res;
    try {
      res = await axios.post(
        "http://127.0.0.1:8080/api/v1/auth/register",
        body
      );
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        Swal.fire("Thank You!", "Your Data has been Saved!", "success");
        navigate("/");
      }
    } catch (err) {
      alert(err.response.data.message);
      /* console.log(err.response.data.message); */
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    register(body);
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
  }

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []); //eslint-disable-line
  return (
    <div className="auth-form-container">
      <div className="login-container">
        <h3> Register Please</h3>
        <div className="">
          <form
            method="POST"
            action=""
            className="login-form"
            onSubmit={handleSubmit}
          >
            <input type="text" placeholder="Enter Name" name="name" required />
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
            <button type="submit">SignUp</button>
          </form>
        </div>
        <div className="bottom-txt">
          <p className="message">Already Registered? </p>
          <Link to="/login" className="link-txt">
            LogIn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
