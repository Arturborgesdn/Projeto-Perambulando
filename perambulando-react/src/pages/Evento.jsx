import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { feirasData, mockEventsData } from '../data/data'

export default function Evento() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      const cleanId = String(id).replace('event-', '').replace('mock-', '').replace('feira-', '')
      
      // 1. Tenta buscar no banco de dados (API)
      try {
        const response = await fetch(`http://127.0.0.1:3001/api/eventos`)
        if (response.ok) {
          const data = await response.json()
          const found = data.find(e => String(e.id) === cleanId)
          if (found) {
            setEvent({ ...found, type: 'api' })
            setLoading(false)
            return
          }
        }
      } catch (error) {
        console.warn('API offline ou erro ao buscar evento:', error)
      }

      // 2. Tenta buscar no mockEventsData
      const mockFound = mockEventsData.find(e => String(e.id) === cleanId)
      if (mockFound) {
        setEvent({ ...mockFound, type: 'mock' })
        setLoading(false)
        return
      }

      // 3. Tenta buscar nas feiras
      const feiraFound = feirasData.find(f => String(f.id) === cleanId)
      if (feiraFound) {
        setEvent({
          id: `feira-${feiraFound.id}`,
          title: feiraFound.name,
          category: 'Rua',
          date: new Date(),
          location: feiraFound.address,
          description: `Feira de ${feiraFound.type} na zona ${feiraFound.zone}. Funcionamento: ${feiraFound.days}. Horário: ${feiraFound.time}`,
          image: feiraFound.image || 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800',
          price: 'Gratuito',
          type: 'feira',
          days: feiraFound.days,
          time: feiraFound.time
        })
        setLoading(false)
        return
      }

      setLoading(false)
    }
    fetchEvent()
  }, [id])

  if (loading) return (
    <>
      <Header />
      <div className="container" style={{ padding: '100px', textAlign: 'center' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '20px' }}></i>
        <p>Carregando detalhes do percurso...</p>
      </div>
      <Footer />
    </>
  )

  if (!event) {
    return (
      <div>
        <Header />
        <main className="container">
          <div className="empty-state" style={{ padding: '100px 20px' }}>
            <i className="fas fa-search-minus" style={{ fontSize: '3rem', marginBottom: '20px', opacity: 0.3 }}></i>
            <h2>Evento não encontrado</h2>
            <p>Não conseguimos localizar o evento solicitado. Ele pode ter sido removido ou o link está incorreto.</p>
            <Link to="/" className="btn-primary" style={{ marginTop: '30px', display: 'inline-flex' }}>
              Voltar para a Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const dateObj = event.date instanceof Date ? event.date : new Date(event.date)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
  const formattedTime = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  function addToSchedule() {
    const dateKey = dateObj.toISOString().split('T')[0]
    const timeToSave = event.type === 'feira' ? (event.time || '08:00') : formattedTime
    const newItem = {
      id: Date.now(),
      time: timeToSave,
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
              <h1 style={{ fontSize: '2.5rem', marginTop: '15px', color: 'var(--accent-orange)' }}>{event.title}</h1>
            </div>
          </div>

          <div className="event-detail-info-container">
            <div className="event-description">
              <h2>Sobre o Evento</h2>
              <p>{event.description || 'Nenhuma descrição detalhada disponível.'}</p>
              
              {event.type === 'feira' && (
                <div style={{ marginTop: '30px', padding: '20px', background: 'var(--bg-paper)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <h3 style={{ marginBottom: '15px' }}>Informações de Funcionamento</h3>
                  <p><strong><i className="far fa-calendar-alt"></i> Dias:</strong> {event.days}</p>
                  <p><strong><i className="far fa-clock"></i> Horário:</strong> {event.time}</p>
                </div>
              )}
            </div>

            <div className="event-sidebar">
              <div className="event-meta-card">
                <div className="event-meta-item">
                  <i className="far fa-calendar-alt"></i>
                  <span>{event.type === 'feira' ? 'Recorrente' : formattedDate}</span>
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
                    <i className="fas fa-external-link-alt"></i> Ver Site Oficial
                  </a>
                )}
                <Link to="/" className="back-link" style={{ marginTop: '10px' }}>
                  ← Voltar para a Home
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
