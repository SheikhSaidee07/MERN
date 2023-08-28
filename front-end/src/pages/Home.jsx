import { React } from "react";
import jwt_decode from "jwt-decode";
import WebCam from "./WebCam";
import ModeratorDashboard from "./ModeratorDashboard";
import AllUsers from "./AllUsers";
import Login from "./Login";
function Home() {
  const { role } = jwt_decode(localStorage.getItem("token"));
  console.log(role);
  if (role === "user") {
    return <WebCam />;
  }
  if (role === "moderator") {
    return <ModeratorDashboard />;
  }
  if (role === "admin") {
    return <AllUsers />;
  } else {
    return <Login />;
  }

  /*  if (role == "admin") */
}

export default Home;
