type Page = 'home' | 'clientes' | 'produtos' | 'login'

interface Props {
  onNavigate: (p: Page) => void
  current: Page
}

export default function Navbar({ onNavigate, current }: Props) {
  return (
    <nav style={{ display: 'flex', gap: 8, padding: 12, alignItems: 'center', borderBottom: '1px solid #ddd' }}>
      <button onClick={() => onNavigate('home')} aria-current={current === 'home'}>Home</button>
      <button onClick={() => onNavigate('clientes')} aria-current={current === 'clientes'}>Cadastro Cliente</button>
      <button onClick={() => onNavigate('produtos')} aria-current={current === 'produtos'}>Cadastro Produto</button>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button onClick={() => onNavigate('login')}>Login</button>
        <button onClick={() => alert('Registrar - função não implementada')}>Registrar</button>
      </div>
    </nav>
  )
}
