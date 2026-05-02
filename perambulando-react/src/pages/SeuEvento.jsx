import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SeuEvento() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Palcos',
    date: '',
    location: '',
    description: '',
    price: '',
    image: '',
    instagramLink: '',
    ticketLink: ''
  })

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (!user) {
      navigate('/login')
    } else {
      setIsLoggedIn(true)
    }
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Erro ao enviar evento')

      navigate('/')
    } catch (error) {
      console.error('Houve um erro ao enviar seu evento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!isLoggedIn) return null

  return (
    <div>
      <Header />
      <main className="container">
        <div className="form-container wide">
          <h2>Divulgue seu Evento! 🚀</h2>
          <p style={{ marginBottom: '20px', color: 'var(--secondary-color)' }}>
            Preencha os dados abaixo para que seu evento apareça no Perambulando.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome do Evento</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Ex: Festival de Jazz do Recife"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Palcos">Palcos</option>
                  <option value="Telas">Telas</option>
                  <option value="Artes">Artes</option>
                  <option value="Rua">Rua</option>
                  <option value="Infantil">Infantil</option>
                </select>
              </div>

              <div className="form-group">
                <label>Data e Hora</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Local</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Ex: Marco Zero, Recife"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preço</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Ex: Gratuito ou R$ 50,00"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Link da Imagem (URL)</label>
                <input
                  type="url"
                  name="image"
                  placeholder="Cole o link de uma imagem da internet"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>URL Site Oficial (Opcional)</label>
                <input
                  type="url"
                  name="instagramLink"
                  placeholder="https://siteoficial.com/seu-evento"
                  value={formData.instagramLink}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>URL Site de Compra (Opcional)</label>
                <input
                  type="url"
                  name="ticketLink"
                  placeholder="https://sympla.com.br/seu-evento"
                  value={formData.ticketLink}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descrição Completa</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Conte mais sobre o que vai rolar..."
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Publicar Evento'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
