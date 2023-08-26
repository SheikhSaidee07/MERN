import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Layout from "./pages/layout/Layout";
import WebCam from "./pages/WebCam";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import Angrypicmode from "./pages/Angrypicmode";
import UserPictures from "./pages/UserPictures";
import AllUsers from "./pages/AllUsers";
import AddUser from "./pages/AddUser";
import UserDetails from "./pages/UserDetails";
import AllAdminPictures from "./pages/AllAdminPictures";
const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // user routes
      {
        path: "/capture",
        element: <WebCam />,
      },
      {
        path: "/allpicture",
        element: <UserPictures />,
      },
      // moderator
      {
        path: "/",
        element: <ModeratorDashboard />,
      },
      {
        path: "/angrypictures",
        element: <Angrypicmode />,
      },

      // admin:
      {
        path: "/users",
        element: <AllUsers />,
      },
      {
        path: "/pictures",
        element: <AllAdminPictures />,
      },
      {
        path: "adduser",
        element: <AddUser />,
      },
      {
        path: "/user/:id",
        element: <UserDetails />,
      },
    ],
  },
];

export default routes;
