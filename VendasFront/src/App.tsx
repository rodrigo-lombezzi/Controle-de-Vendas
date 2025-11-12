import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CadastroCliente from './pages/CadastroCliente'
import CadastroProduto from './pages/CadastroProduto'
import Login from './pages/Login'

export type Page = 'home' | 'clientes' | 'produtos' | 'login'

function App() {
	const [page, setPage] = useState<Page>('home')

	return (
		<div className="app-root">
			{/* you can pass setPage directly now */}
			<Navbar onNavigate={setPage} current={page} />
			<main style={{ padding: 16 }}>
				{page === 'home' && <Home onNavigate={(p) => setPage(p)} />}
				{page === 'clientes' && <CadastroCliente />}
				{page === 'produtos' && <CadastroProduto />}
				{page === 'login' && <Login onLoggedIn={() => setPage('home')} />}
			</main>
		</div>
	)
}

export default App
