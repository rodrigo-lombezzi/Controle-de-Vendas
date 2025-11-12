import React, { useState } from 'react'

export default function CadastroCliente() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Cliente salvo:\nNome: ${nome}\nEmail: ${email}`)
    setNome('')
    setEmail('')
  }

  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
        <label>
          Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  )
}
