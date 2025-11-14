import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import Layout from '../components/Layout';
import { routes } from './routes';

export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Layout/>} />
      <Route path={routes.Landing} element={<div>Landing Page</div>} />
      <Route path={routes.Login} element={<div>Login Page</div>} />
      <Route path={routes.Dashboard} element={<div>Dashboard Page</div>} />
      <Route path={routes.Profile} element={<div>Profile Page</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />

       </>
    )
);
export default function AppRoutes() {
  return <RouterProvider router={router} />;
}