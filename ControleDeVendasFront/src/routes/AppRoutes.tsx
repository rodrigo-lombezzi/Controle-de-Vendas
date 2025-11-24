import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/Home";
import ProfileForm from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Servicos from "../pages/Servicing";
import Produtos from "../pages/Products";
import Clientes from "../pages/Custormers";
import Vendas from "../pages/Sales";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
<>
    <Route path="/" element={<Home/>}>
      <Route index element={<LandingPage />} />
      <Route path="/profile" element={<ProfileForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/vendas" element={<Vendas />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="*" element={<NotFound />} />
      </Route>
</>
  )
);
export default function AppRoutes() {
  return <RouterProvider router={router} />;
}