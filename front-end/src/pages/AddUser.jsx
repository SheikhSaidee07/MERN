import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const navigate = useNavigate();
  const register = async (body) => {
    let res;
    try {
      res = await axios.post(
        "http://127.0.0.1:8080/api/v1/auth/register",
        body
      );
      if (res.status === 201) {
        alert("User has Been Added Successfully");
        navigate("/users");
      }
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data.message);
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
  useEffect(() => {}, []); //eslint-disable-line
  return (
    <div className="auth-form-container">
      <div className="login-container">
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
            <button type="submit">Add User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
