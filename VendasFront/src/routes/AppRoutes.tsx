import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import React from 'react';

export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       </>
    )
);
export default function AppRoutes() {
  return <RouterProvider router={router} />;
}