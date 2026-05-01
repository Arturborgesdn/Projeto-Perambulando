import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { feirasData } from '../data/data'

export default function Evento() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      // Tenta buscar no banco de dados primeiro (Eventos)
      if (id.startsWith('event-') || !isNaN(id)) {
        const cleanId = id.replace('event-', '')
        try {
          const response = await fetch(`http://127.0.0.1:3001/api/eventos`)
          const data = await response.json()
          const found = data.find(e => String(e.id) === cleanId)
          if (found) {
            setEvent({ ...found, type: 'event' })
            setLoading(false)
            return
          }
        } catch (error) {
          console.error('Erro ao buscar evento na API:', error)
        }
      }

      // Se não encontrou, tenta buscar nas feiras (Mock Data)
      const cleanId = id.replace('feira-', '')
      const feira = feirasData.find(f => String(feira.id) === cleanId)
      if (feira) {
        setEvent({
          title: feira.name,
          category: 'Feira',
          date: new Date(),
          location: feira.address,
          description: `Feira de ${feira.type} na zona ${feira.zone}. Funcionamento: ${feira.days}`,
          image: feira.image || 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800',
          price: 'Gratuito',
          type: 'feira'
        })
      }
      setLoading(false)
    }
    fetchEvent()
  }, [id])

  if (loading) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Carregando detalhes...</div>

  if (!event) {
    return (
      <div>
        <Header />
        <main className="container">
          <p className="empty-state">Evento não encontrado. <Link to="/">Voltar à página inicial</Link></p>
        </main>
        <Footer />
      </div>
    )
  }

  const dateObj = new Date(event.date)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
  const formattedTime = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  function addToSchedule() {
    const dateKey = dateObj.toISOString().split('T')[0]
    const newItem = {
      id: Date.now(),
      time: formattedTime,
      title: event.title,
      details: event.location,
      type: 'event',
    }
    const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {}
    if (!schedule[dateKey]) schedule[dateKey] = []
    schedule[dateKey].push(newItem)
    localStorage.setItem('userSchedule', JSON.stringify(schedule))
    alert(`"${event.title}" adicionado à sua programação!`)
  }

  return (
    <div>
      <Header />
      <main className="container">
        <div className="event-detail-content">
          <div className="event-hero">
            <img src={event.image} alt={event.title} className="event-hero-img" />
            <div className="event-hero-overlay">
              <span className="category">{event.category || 'Evento'}</span>
              <h1 style={{ fontSize: '2.5rem', marginTop: '15px' }}>{event.title}</h1>
            </div>
          </div>

          <div className="event-detail-info-container">
            <div className="event-description">
              <h2>Sobre o Evento</h2>
              <p>{event.description || 'Nenhuma descrição detalhada disponível.'}</p>
            </div>

            <div className="event-sidebar">
              <div className="event-meta-card">
                <div className="event-meta-item">
                  <i className="far fa-calendar-alt"></i>
                  <span>{formattedDate}</span>
                </div>
                {event.type !== 'feira' && (
                  <div className="event-meta-item">
                    <i className="far fa-clock"></i>
                    <span>{formattedTime}</span>
                  </div>
                )}
                <div className="event-meta-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.location}</span>
                </div>
                <div className="event-meta-item">
                  <i className="fas fa-tag"></i>
                  <span>{event.price || 'Gratuito'}</span>
                </div>
              </div>

              <div className="event-detail-actions">
                <button className="btn-submit btn-add-schedule" onClick={addToSchedule}>
                  <i className="far fa-calendar-plus"></i> Adicionar à Programação
                </button>
                {event.ticketLink && (
                  <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="btn-ticket">
                    <i className="fas fa-ticket-alt"></i> Comprar Ingresso
                  </a>
                )}
                {event.instagramLink && (
                  <a href={event.instagramLink} target="_blank" rel="noopener noreferrer" className="btn-instagram">
                    <i className="fab fa-instagram"></i> Ver no Instagram
                  </a>
                )}
                <Link to="/" className="back-link">
                  ← Voltar para a busca
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
