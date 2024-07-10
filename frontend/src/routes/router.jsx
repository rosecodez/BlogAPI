import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from '../components/navbar';
import ErrorPage from './error-page.jsx';
import BlogsPage from './blogs-page.jsx';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: <ErrorPage />,

      children: [
        {
          path: '/blogs',
          element: <BlogsPage />,
        },
        {
          path: '/user-details',
          element: <BlogsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
