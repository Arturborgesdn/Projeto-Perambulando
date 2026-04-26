import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ email: user.email }))
      navigate('/painel')
    } else {
      setError('E-mail ou senha incorretos. Verifique seus dados ou cadastre-se.')
    }
  }

  return (
    <div>
      <Header />
      <main className="container">
        <div className="form-container">
          <h2>Que bom te ver de novo! 👋</h2>
          {error && <p style={{ color: 'red', marginBottom: 15 }}>{error}</p>}
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
            <button type="submit" className="btn-submit">Entrar</button>
          </form>
          <p className="form-redirect">
            Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui!</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
