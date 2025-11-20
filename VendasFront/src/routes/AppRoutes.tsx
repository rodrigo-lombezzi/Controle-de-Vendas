
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/LandingPage';
import Login from '../pages/LoginPage';
import CadastroProduto from '../pages/CadastroProduto';
import CadastroCliente from '../pages/CadastroCliente';


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produtos/cadastro" element={<CadastroProduto />} />
        <Route path="/clientes/cadastro" element={<CadastroCliente />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}