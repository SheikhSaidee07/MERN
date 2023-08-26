import React from "react";

function AdminDashboard() {
  return (
    <header className="header">
      <h1> Admin Dashboard</h1>
      <nav className="navigation">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/allusers">AllUsers</a>
          </li>
          <li>
            <a href="/allpictures">AllPictures</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AdminDashboard;
