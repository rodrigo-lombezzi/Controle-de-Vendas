type Page = 'home' | 'clientes' | 'produtos' | 'login'

interface Props {
  onNavigate: (p: Page) => void
}

export default function Home({ onNavigate }: Props) {
  return (
    <div className="card">
      <h2 className="title">Bem-vindo ao Controle de Vendas</h2>
      <p>Use a navegação acima para acessar os cadastros ou faça login para começar.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
        <button onClick={() => onNavigate('clientes')}>Cadastro de Cliente</button>
        <button className="secondary" onClick={() => onNavigate('produtos')}>Cadastro de Produto</button>
      </div>
    </div>
  )
}
