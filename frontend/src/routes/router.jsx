import React from 'react';
import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navbar from '../components/navbar';

import ErrorPage from './error-page.jsx';
import BlogsPage from './blogs-page.jsx';
import BlogDetailPage from './blog-detail-page.jsx';
import SignupPage from './signup-page.jsx';
import LoginPage from './login-page.jsx';
import ProfilePage from './profile-page.jsx';
import LogoutPage from './logout-page.jsx';
import NewBlogPage from './new-blog-page.jsx';
import BlogCommentsPage from './post-comments-page.jsx';

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      
      // determine if user is author
      fetch('http://localhost:3000/users/profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        mode: "cors"
      })
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch user details");
        return response.json();
      })
      .then(data => {
        setIsAuthor(data.user.username === "samuelt");
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);

  // make sure that on login 'isAuthor' is true, in order to see "Create new post", with the desired authorization at /profile
  const login = () => {
    setIsAuthenticated(true);
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/users/profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        mode: "cors"
      })
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch user details");
        return response.json();
      })
      .then(data => {
        setIsAuthor(data.user.username === "samuelt");
      })
      .catch(error => {
        console.error(error);
      });
    }
  };
  
  const signup = () => {
    setIsAuthenticated(true);
  }

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthor(false);
    localStorage.removeItem('token');
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar isAuthenticated={isAuthenticated} />,
      errorElement: <ErrorPage />,

      children: [
        {
          path: '/',
          element: <BlogsPage />,
        },
        {
          path: '/posts/:postId',
          element: <BlogDetailPage isAuthenticated={isAuthenticated} isAuthor={isAuthor} />,
        },
        {
          path: '/posts/:postId/comments',
          element: <BlogCommentsPage isAuthenticated={isAuthenticated} />,
        },
        {
          path: "/signup",
          element: <SignupPage signup={signup} />,
        },
        {
          path: "/login",
          element: <LoginPage login={login} />,
        },
        { path: "/profile",
          element: isAuthenticated ? <ProfilePage isAuthor={isAuthor} /> : <LoginPage login={login} /> },
        {
          path: "/profile/new-blog",
          element: isAuthenticated ? <NewBlogPage /> : <LoginPage login={login} />,
        },
        {
          path: "/profile/logout",
          element: <LogoutPage logout={logout}/>,
        }
      ],
    },
  ]);
  console.log("isAuthenticated:", isAuthenticated);
  return <RouterProvider router={router} />;
};

export default Router;
