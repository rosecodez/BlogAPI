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

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };
  
  const signup = () => {
    setIsAuthenticated(true);
  }

  const logout = () => {
    setIsAuthenticated(false);
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
          element: <BlogDetailPage isAuthenticated={isAuthenticated} />,
        },
        {
          path: "/signup",
          element: <SignupPage signup={signup} />,
        },
        {
          path: "/login",
          element: <LoginPage login={login} />,
        },
        {
          path: "/profile",
          element: isAuthenticated ? <ProfilePage /> : <LoginPage login={login} />,
        },
        {
          path: "/logout",
          element: <LogoutPage logout={logout}/>,
        }
      ],
    },
  ]);
  console.log("isAuthenticated:", isAuthenticated);
  return <RouterProvider router={router} />;
};

export default Router;
