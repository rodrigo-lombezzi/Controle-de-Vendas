import React, { useState } from 'react'

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  )
}
