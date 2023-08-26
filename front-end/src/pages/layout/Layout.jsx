import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import jwt_decode from "jwt-decode";
function Layout() {
  const decodedToken = jwt_decode(localStorage.getItem("token"));
  const { role } = decodedToken;
  console.log(role);
  return (
    <>
      <Nav role={role} />
      <Outlet />
    </>
  );
}
export default Layout;
