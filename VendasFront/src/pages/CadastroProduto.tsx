import React, { useState } from 'react'
import { FiTag, FiDollarSign } from 'react-icons/fi'

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
    <div className="card">
      <h2 className="title">Cadastro de Produto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
        <label>
          Nome
          <div className="input-with-icon">
            <FiTag className="icon-input" />
            <input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
        </label>
        <label>
          Preço
          <div className="input-with-icon">
            <FiDollarSign className="icon-input" />
            <input value={preco} onChange={(e) => setPreco(e.target.value)} />
          </div>
        </label>
        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  )
}
