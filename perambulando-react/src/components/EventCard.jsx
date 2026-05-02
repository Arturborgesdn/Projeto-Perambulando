import { useState } from 'react'
import { Link } from 'react-router-dom'

const getCategoryRoute = (category) => {
  const map = {
    'Palcos': '/palcos',
    'Telas': '/telas',
    'Artes': '/artes',
    'Rua': '/rua',
    'Infantil': '/infantil',
    'Cinema': '/telas',
    'Teatro': '/palcos',
    'Restaurantes': '/restaurantes',
    'Feiras': '/rua',
    'Shows': '/palcos',
    'Exposições': '/artes',
    'Lazer': '/rua'
  };
  return map[category] || '/';
};

export default function EventCard({ event, isSmall }) {
  const [showImage, setShowImage] = useState(false);
  const isFeira = event.isFeira || (event.id && String(event.id).startsWith('feira-'));
  
  const dateObj = event.date instanceof Date ? event.date : new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
  const formattedTime = dateObj.toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit'
  })

  function addToSchedule(e) {
    e.preventDefault();
    e.stopPropagation();
    const dateKey = dateObj.toISOString().split('T')[0]
    const timeToSave = isFeira ? (event.time || '08:00') : formattedTime;
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
    alert(`"${event.title}" foi adicionado à sua programação!`)
  }

  const categoryLink = getCategoryRoute(event.type);

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    setShowImage(!showImage);
  };

  return (
    <div 
      className={`feira-card ${isSmall ? 'event-card-small' : ''}`} 
      onClick={handleCardClick}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      {showImage && event.image && (
        <div className="card-image-reveal" style={{ width: '100%', marginBottom: '10px' }}>
          <img 
            src={event.image} 
            alt={event.title} 
            style={{ width: '100%', borderRadius: 'var(--radius-sm)', maxHeight: '200px', objectFit: 'cover' }} 
          />
        </div>
      )}

      <div className="event-info" style={{ padding: 0 }}>
        <Link to={categoryLink} className="category" style={{ marginBottom: '5px' }} onClick={(e) => e.stopPropagation()}>
          {event.type}
        </Link>
        
        <h3 style={{ margin: '5px 0' }}>{event.title}</h3>

        <p className="tech-info" style={{ marginBottom: '4px' }}>
          <span className="pin-marker"></span>
          {event.location}
        </p>
        
        {isFeira ? (
          <>
            <p className="tech-info"><i className="far fa-calendar-alt"></i> {event.days || 'Diariamente'}</p>
            <p className="tech-info"><i className="far fa-clock"></i> {event.time || '16:00 às 22:00'}</p>
          </>
        ) : (
          <>
            <p className="tech-info"><i className="far fa-calendar-alt"></i> {formattedDate}</p>
            <p className="tech-info"><i className="far fa-clock"></i> {formattedTime}</p>
          </>
        )}
      </div>

      <div className="event-actions-bar" style={{ padding: '10px 0 0', marginTop: 'auto', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button 
          className="action-icon-btn schedule-mini btn-add-schedule" 
          onClick={addToSchedule} 
          title="Adicionar à Programação" 
          style={{ 
            flex: isSmall ? 'none' : 1, 
            padding: isSmall ? '0' : '8px', 
            fontSize: isSmall ? '1.1rem' : '0.75rem',
            width: isSmall ? '38px' : 'auto',
            height: isSmall ? '38px' : 'auto'
          }}
        >
          <i className="far fa-calendar-plus"></i> {!isSmall && " Programar"}
        </button>
        <Link 
          to={event.id && !String(event.id).startsWith('feira-') && !String(event.id).startsWith('cinema-group-') ? `/evento/${String(event.id).replace('event-', '').replace('mock-', '')}` : categoryLink}
          className="action-icon-btn ticket" 
          style={{ flex: 1, padding: '8px', fontSize: '0.75rem', textDecoration: 'none', textAlign: 'center', height: isSmall ? '38px' : 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={(e) => e.stopPropagation()}
        >
          <i className="fas fa-info-circle"></i> Saiba Mais
        </Link>
      </div>
      
      <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'right', marginTop: '5px' }}>
        {showImage ? 'Clique para ocultar imagem' : 'Clique para ver imagem'}
      </div>
    </div>
  )
}
