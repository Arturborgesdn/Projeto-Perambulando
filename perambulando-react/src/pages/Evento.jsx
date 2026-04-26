import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { mockEventsData } from '../data/data'

export default function Evento() {
  const { id } = useParams()
  const event = mockEventsData.find(e => String(e.id) === id)

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
              <span className="category" style={{ backgroundColor: 'var(--primary-color)' }}>{event.category}</span>
              <h1 style={{ fontSize: '2.5rem', marginTop: '15px' }}>{event.title}</h1>
            </div>
          </div>

          <div className="event-detail-info-container">
            <div className="event-description">
              <h2>Sobre o Evento</h2>
              <p>{event.description}</p>
            </div>

            <div className="event-sidebar">
              <div className="event-meta-card">
                <div className="event-meta-item">
                  <i className="far fa-calendar-alt"></i>
                  <span>{formattedDate}</span>
                </div>
                <div className="event-meta-item">
                  <i className="far fa-clock"></i>
                  <span>{formattedTime}</span>
                </div>
                <div className="event-meta-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.location}</span>
                </div>
                <div className="event-meta-item">
                  <i className="fas fa-tag"></i>
                  <span>{event.price}</span>
                </div>
                {event.genre && (
                  <div className="event-meta-item">
                    <i className="fas fa-music"></i>
                    <span>{event.genre}</span>
                  </div>
                )}
              </div>

              <div className="event-detail-actions">
                <button className="btn-submit" onClick={addToSchedule}>
                  🗓️ Adicionar à Programação
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
