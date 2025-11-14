import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Sales from '../pages/Sales';
import Login from '../pages/Login';
import CadastroProduto from '../pages/CadastroProduto';
import CadastroCliente from '../pages/CadastroCliente';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produtos/cadastro" element={<CadastroProduto />} />
        <Route path="/clientes/cadastro" element={<CadastroCliente />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
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