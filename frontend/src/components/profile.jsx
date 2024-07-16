import React, { useState, useEffect } from "react";

export default function Profile() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      console.log(data.user)
      setUsername(data.user.username);
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
      <h2>Welcome, {username}!</h2>
    </div>
  );
}
