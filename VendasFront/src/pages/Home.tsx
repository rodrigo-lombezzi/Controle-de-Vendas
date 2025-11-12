type Page = 'home' | 'clientes' | 'produtos' | 'login'

interface Props {
  onNavigate: (p: Page) => void
}

export default function Home({ onNavigate }: Props) {
  return (
    <div>
      <h2>Bem-vindo ao Controle de Vendas</h2>
      <p>Use a navegação acima para ir para os cadastros ou realizar login.</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => onNavigate('clientes')}>Ir para Cadastro de Cliente</button>
        <button onClick={() => onNavigate('produtos')}>Ir para Cadastro de Produto</button>
      </div>
    </div>
  )
}
