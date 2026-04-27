import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('http://127.0.0.1:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao realizar login')
      }

      localStorage.setItem('currentUser', JSON.stringify({ 
        id: data.id, 
        nome: data.nome, 
        email: data.email 
      }))
      navigate('/')
    } catch (err) {
      setError(err.message)
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
