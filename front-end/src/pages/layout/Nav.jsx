import { NavLink } from "react-router-dom";
import "../../App.css";
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

function Navbar({ role }) {
  return (
    <nav className="navbar">
      <ul>
        {navItems[role].map((item, index) => (
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
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
