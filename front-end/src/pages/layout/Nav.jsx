import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "../../App.css";
import { useNavigate } from "react-router-dom";
const navItems = {
  admin: [
    {
      name: "Users",
      path: "/",
    },
    {
      name: "Pictures",
      path: "/pictures",
    },
    {
      name: "Add User",
      path: "/adduser",
    },
  ],
  user: [
    {
      name: "Capture",
      path: "/capture",
    },
    {
      name: "All Picture",
      path: "/allpicture",
    },
  ],
  moderator: [
    {
      name: "All Pictures",
      path: "/",
    },
    {
      name: "All Angry Pictures",
      path: "/angrypictures",
    },
  ],
};

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { role } = jwt_decode(token);
  return (
    <nav className="navbar">
      <ul>
        {navItems[role].map((item, index) => (
          <>
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : ""
                }
              >
                {item.name}
              </NavLink>
            </li>
          </>
        ))}
        <li>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
