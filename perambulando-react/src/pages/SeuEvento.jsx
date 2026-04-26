import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function SeuEvento() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Shows',
    date: '',
    location: '',
    description: '',
    price: '',
    banner: null,
    photos: []
  })

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (!user) {
      alert('Você precisa estar logado para cadastrar um evento!')
      navigate('/login')
    } else {
      setIsLoggedIn(true)
    }
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (name === 'banner') {
      setFormData(prev => ({ ...prev, banner: files[0] }))
    } else {
      setFormData(prev => ({ ...prev, photos: [...files] }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você faria o upload dos dados para um servidor
    console.log('Evento cadastrado:', formData)
    alert('Evento enviado para análise! 🎉')
    navigate('/')
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

          <form onSubmit={handleSubmit} className="event-form">
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
                  <option value="Shows">Shows</option>
                  <option value="Cinema">Cinema</option>
                  <option value="Teatro">Teatro</option>
                  <option value="Exposições">Exposições</option>
                  <option value="Feira">Feira</option>
                  <option value="Lazer">Lazer</option>
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

            <div className="file-upload-section">
              <div className="form-group">
                <label>Banner Principal (Capa)</label>
                <div className="file-input-wrapper">
                  <input type="file" name="banner" accept="image/*" onChange={handleFileChange} required />
                  <p className="file-hint">Formatos: JPG, PNG. Recomendado: 1200x400px</p>
                </div>
              </div>

              <div className="form-group">
                <label>Fotos da Galeria</label>
                <div className="file-input-wrapper">
                  <input type="file" name="photos" accept="image/*" multiple onChange={handleFileChange} />
                  <p className="file-hint">Você pode selecionar várias fotos.</p>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-submit">Publicar Evento</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
