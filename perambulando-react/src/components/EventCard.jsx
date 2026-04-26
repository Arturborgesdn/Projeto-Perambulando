import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  const formattedDate = event.date.toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
  const formattedTime = event.date.toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit'
  })

  function addToSchedule() {
    const dateKey = event.date.toISOString().split('T')[0]
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
    alert(`"${event.title}" foi adicionado à sua programação!`)
  }

  return (
    <div className="event-card">
      <Link to={event.link || `/evento/${event.id}`} className="event-card-link">
        <img src={event.image} alt={event.title} />
        <div className="event-info">
          <span className="category">{event.type}</span>
          <h3>{event.title}</h3>
          <p><i className="far fa-calendar-alt"></i> {formattedDate} às {formattedTime}</p>
          <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
        </div>
      </Link>
      <div className="event-actions">
        <button className="add-schedule-btn" onClick={addToSchedule}>
          🗓️ Adicionar à Programação
        </button>
      </div>
    </div>
  )
}
