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
        <div id="event-detail-content">
          <img src={event.image} alt={event.title} className="event-detail-image" />

          <div className="event-detail-header">
            <span className="category">{event.category}</span>
            <h1 style={{ fontSize: '2rem', margin: '10px 0', color: 'var(--dark-color)' }}>{event.title}</h1>
          </div>

          <div className="event-detail-meta">
            <p><i className="far fa-calendar-alt"></i> {formattedDate} às {formattedTime}</p>
            <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
            <p><i className="fas fa-tag"></i> {event.price}</p>
            {event.genre && <p><i className="fas fa-music"></i> {event.genre}</p>}
          </div>

          <div className="event-detail-body">
            <h2>Sobre o Evento</h2>
            <p>{event.description}</p>
          </div>

          <div style={{ marginTop: 30, display: 'flex', gap: 15 }}>
            <button className="add-schedule-btn" style={{ padding: '12px 25px', fontSize: '1rem' }} onClick={addToSchedule}>
              🗓️ Adicionar à Programação
            </button>
            <Link to="/" style={{ padding: '12px 25px', border: '2px solid #ddd', borderRadius: 8, textDecoration: 'none', color: 'var(--text-color)', fontWeight: 600 }}>
              ← Voltar
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
