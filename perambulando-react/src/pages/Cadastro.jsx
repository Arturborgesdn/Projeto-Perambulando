import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Cadastro() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) {
      setError('Este e-mail já está cadastrado.')
      return
    }
    users.push({ email, password })
    localStorage.setItem('users', JSON.stringify(users))
    setSuccess(true)
    setTimeout(() => navigate('/login'), 2000)
  }

  return (
    <div>
      <Header />
      <main className="container">
        <div className="form-container">
          <h2>Crie sua conta 🎉</h2>
          {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}
          {success && <p style={{ color: 'green', marginBottom: 15 }}>Cadastro realizado! Redirecionando para o login...</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirme a Senha</label>
              <input
                type="password"
                id="confirm"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-submit">Cadastrar</button>
          </form>
          <p className="form-redirect">
            Já tem uma conta? <Link to="/login">Faça login!</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
