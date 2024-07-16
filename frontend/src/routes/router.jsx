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

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
          element: <SignupPage/>,
        },
        {
          path: "/login",
          element: <LoginPage/>,
        },
        {
          path:"/profile",
          element: <ProfilePage/>,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
