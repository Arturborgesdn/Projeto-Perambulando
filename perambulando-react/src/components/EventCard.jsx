import { Link } from 'react-router-dom'

export default function EventCard({ event, isSmall }) {
  const dateObj = event.date instanceof Date ? event.date : new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
  const formattedTime = dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit'
  })

  function addToSchedule(e) {
    e.preventDefault();
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
    alert(`"${event.title}" foi adicionado à sua programação!`)
  }

  return (
    <div className={`event-card ${isSmall ? 'event-card-small' : ''}`}>
      <Link to={event.link || `/evento/${event.id}`} className="event-card-link">
        <img src={event.image} alt={event.title} />
        <div className="event-info">
          <span className="category">{event.type}</span>
          <h3>{event.title}</h3>
          <p className="tech-info"><i className="far fa-calendar-alt"></i> {formattedDate} - {formattedTime}</p>
          <p className="tech-info">
            <span className="pin-marker"></span>
            {event.location}
          </p>
        </div>
      </Link>
      
      <div className="event-actions-bar">
        <button className="action-icon-btn schedule-mini btn-add-schedule" onClick={addToSchedule} title="Adicionar à Programação">
          <i className="far fa-calendar-plus"></i>
        </button>
        
        {event.ticketLink && (
          <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="action-icon-btn ticket">
            <i className="fas fa-ticket-alt"></i> Ingressos
          </a>
        )}
        
        {event.instagramLink && (
          <a href={event.instagramLink} target="_blank" rel="noopener noreferrer" className="action-icon-btn instagram">
            <i className="fab fa-instagram"></i>
          </a>
        )}
      </div>
    </div>
  )
}
