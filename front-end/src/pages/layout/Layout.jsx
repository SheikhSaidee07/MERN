import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!localStorage.getItem("token")) return <></>;
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
export default Layout;
