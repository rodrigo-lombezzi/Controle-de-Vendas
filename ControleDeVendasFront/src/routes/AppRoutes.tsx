import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Products from '../pages/Products';
import Customers from '../pages/Customers';
import Sales from '../pages/Sales';
import Dashboard from '../pages/Dashboard';
import { routes } from './routes';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: routes.dashboard, element: <Dashboard /> },
  { path: routes.products, element: <Products /> },
  { path: routes.customers, element: <Customers /> },
  { path: routes.sales, element: <Sales /> },
  { path: routes.profile, element: <Profile /> },
  { path: '*', element: <NotFound /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}