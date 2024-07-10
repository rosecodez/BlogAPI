import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <section id="navbar">
        <div id="blogs-container">
          <Link to="/blogs"> 
            <h2 id="blog">Blog</h2>
          </Link>
          <Link to="/user-details">
            <h2 id="user-details">User</h2>
          </Link>
        </div>
      </section>
      <Outlet />
    </>
  );
}
