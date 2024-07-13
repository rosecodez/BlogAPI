import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from '../components/navbar';
import ErrorPage from './error-page.jsx';
import BlogsPage from './blogs-page.jsx';
import BlogDetailPage from './blog-detail-page.jsx';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
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
          path: '/user-details',
          element: <BlogsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
