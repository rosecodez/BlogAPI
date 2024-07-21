import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/users/profile`, { 
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`, 
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      setUsername(data.user.username);
      setIsAuthor(data.user.username === "samuelt");
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  }, []);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="pt-5 text-2xl bold font-mono">Welcome, {username}!</h2>
      <div id="profile-links" className="flex flex-row gap-2"> 
        {isAuthor && (
          <Link to="/profile/new-blog">Create new post</Link>
        )}
        <Link to="/profile/logout">Log out</Link>
      </div>
      
    </div>
  );
}
