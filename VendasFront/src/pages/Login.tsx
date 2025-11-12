import React, { useState } from 'react'
import { FiMail, FiLock } from 'react-icons/fi'

interface Props {
  onLoggedIn?: () => void
}

export default function Login({ onLoggedIn }: Props) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você integraria com autenticação real.
    alert(`Login: ${email}`)
    onLoggedIn?.()
  }

  return (
    <div className="card">
      <h2 className="title">Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
        <label>
          Email
          <div className="input-with-icon">
            <FiMail className="icon-input" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </label>
        <label>
          Senha
          <div className="input-with-icon">
            <FiLock className="icon-input" />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
        </label>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  )
}
