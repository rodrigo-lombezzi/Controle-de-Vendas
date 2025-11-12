import React, { useState } from 'react'

export default function CadastroProduto() {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Produto salvo:\nNome: ${nome}\nPreço: ${preco}`)
    setNome('')
    setPreco('')
  }

  return (
    <div>
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
        <label>
          Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Preço
          <input value={preco} onChange={(e) => setPreco(e.target.value)} />
        </label>
        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  )
}
