import React from 'react';
import { useState } from 'react';

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

  const login = () => {
    setIsAuthenticated(true);
  };
  
  const signup = () => {
    setIsAuthenticated(true);
  }
  const logout = () => {
    setIsAuthenticated(false);
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
          element: <BlogDetailPage />,
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

  return <RouterProvider router={router} />;
};

export default Router;
