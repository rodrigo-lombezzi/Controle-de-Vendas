import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout     from "../components/Layout";
import LandingPage from "../pages/LandingPage";
import { routes } from "./routes";
import LoginPage from "../pages/LoginPage";
import UserRegistration from "../pages/Registration/UserRegistration";
import NotFound from "../pages/NotFound";
import Sales from "../pages/Sales";
import Products from "../pages/Products";
import Customers from "../pages/Customers";

export const router = createBrowserRouter(
  createRoutesFromElements(
<>
    <Route path="/" element={<Layout />}>
      <Route path={routes.LANDING} element={<LandingPage />} />
      <Route path={routes.LOGIN} element={<LoginPage />} /> 
      <Route path={routes.USERSIGNUP} element={<UserRegistration />} /> 
      <Route path={routes.SALESPAGE} element={<Sales />} />
      <Route path={routes.PRODUCTSPAGE} element={<Products />} />
      <Route path={routes.CUSTOMERSPAGE} element={<Customers />} />
      <Route path="*" element={<NotFound />} />
      </Route>
</>
  )
);
export default function AppRoutes() {
  return <RouterProvider router={router} />;
}