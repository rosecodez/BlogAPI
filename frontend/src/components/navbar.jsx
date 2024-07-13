import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Navbar( { isAuthenticated }) {
  return (
    <>
      <div className="rounded-lg pt-3 sticky top-0 bg-gradient-to-r from-green-400 to-blue-500">
        <section className="pb-3 font-bold" id="navbar">
          <div className="text-2xl bold ml-10 font-mono" id="blogs-container">
            <Link to="/">
              <h2 id="blog">Home</h2>
            </Link>
            {isAuthenticated ? (
              <Link to="/profile">
                <h2 id="profile">Profile</h2>
              </Link>
            ) : (
              <Link to="/signup">
                <h2 id="signup">Sign Up</h2>
              </Link>
            )}

          </div>
        </section>
      </div>
      <Outlet />
    </>
  );
}
