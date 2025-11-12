import { useState } from 'react';
import { AuthProvider, useAuth } from './lib/auth';
import Layout from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Customers from './pages/CadastroCliente';
import Products from './pages/CadastroProduto';
import Sales from './pages/Sales';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'customers':
        return <Customers />;
      case 'products':
        return <Products />;
      case 'sales':
        return <Sales />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
