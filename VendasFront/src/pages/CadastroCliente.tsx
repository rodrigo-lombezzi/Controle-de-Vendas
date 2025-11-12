import React, { useState } from 'react'
import { FiUser, FiMail } from 'react-icons/fi'

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
    <div className="card">
      <h2 className="title">Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
        <label>
          Nome
          <div className="input-with-icon">
            <FiUser className="icon-input" />
            <input value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
        </label>
        <label>
          Email
          <div className="input-with-icon">
            <FiMail className="icon-input" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </label>
        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  )
}
