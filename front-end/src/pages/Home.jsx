import React from "react";
import jwt_decode from "jwt-decode";
import WebCam from "./WebCam";
import ModeratorDashboard from "./ModeratorDashboard";
import AllUsers from "./AllUsers";
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
  }
  /*  if (role == "admin") */
}

export default Home;
