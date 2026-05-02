import { useState, useEffect, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { teatroData, mockEventsData } from '../data/data'

function getRatingClass(rating) {
  if (!rating) return ''
  return `rating-${rating.split(' ')[0].toLowerCase()}`
}

function ShowModal({ details, onClose }) {
  if (!details) return null
  const { teatroName, showTitle, session } = details
  const teatro = teatroData.find(t => t.name === teatroName)
  const show = teatro?.shows.find(s => s.title === showTitle)
  const formattedDate = new Date(`${session.date}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })

  function addToSchedule() {
    const dateKey = session.date
    const newItem = { id: Date.now(), time: session.time, title: showTitle, details: teatroName, type: 'event' }
    const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {}
    if (!schedule[dateKey]) schedule[dateKey] = []
    schedule[dateKey].push(newItem)
    localStorage.setItem('userSchedule', JSON.stringify(schedule))
    alert(`"${showTitle}" adicionado à sua programação!`)
  }

  return (
    <>
      <div className="modal-overlay active" onClick={onClose}></div>
      <div className="modal active">
        <div className="modal-header">
          <h2>Detalhes da Peça</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <h3>{showTitle}</h3>
          <p><strong>Classificação:</strong> {show?.rating}</p>
          <p><strong>Teatro:</strong> {teatroName}</p>
          <p><strong>Sessão:</strong> {session.time} — {formattedDate}</p>
          <p><strong>Preço:</strong> {session.price}</p>

          <div className="event-detail-actions" style={{ marginTop: 20 }}>
            <button className="btn-submit btn-add-schedule" onClick={addToSchedule}>
              <i className="far fa-calendar-plus"></i> Adicionar à Minha Programação
            </button>
            {teatro?.instagramLink && (
              <a href={teatro.instagramLink} target="_blank" rel="noopener noreferrer" className="btn-instagram">
                <i className="fas fa-external-link-alt"></i> Ver Site Oficial
              </a>
            )}
          </div>

          <h3 style={{ marginTop: 20 }}>Sinopse</h3>
          <p>{show?.synopsis}</p>
        </div>
        <div className="modal-footer">
          {teatro?.ticketLink ? (
            <a href={teatro.ticketLink} target="_blank" rel="noopener noreferrer" className="btn-ticket" style={{ width: '100%' }}>
              <i className="fas fa-ticket-alt"></i> Comprar Ingressos
            </a>
          ) : (
            <button className="buy-ticket-btn" style={{ width: '100%' }}>Comprar Ingressos</button>
          )}
        </div>
      </div>
    </>
  )
}

export default function Teatro() {
  const [modal, setModal] = useState(null)
  const [eventsFromApi, setEventsFromApi] = useState([])

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/eventos')
        const data = await response.json()
        setEventsFromApi(data)
      } catch (error) {
        console.error('Erro ao buscar eventos:', error)
      }
    }
    fetchEvents()
  }, [])

  const palcosEvents = useMemo(() => {
    // 1. Filtrar eventos estáticos
    const staticEvents = mockEventsData
      .filter(e => ['Palcos', 'Shows', 'Teatro'].includes(e.category))
      .map(e => ({
        ...e,
        type: e.category,
        date: new Date(e.date)
      }));

    // 2. Filtrar eventos da API
    const apiEvents = eventsFromApi
      .filter(e => ['Palcos', 'Shows', 'Teatro'].includes(e.category))
      .map(e => ({
        id: `event-${e.id}`,
        title: e.title,
        type: e.category,
        date: new Date(e.date),
        location: e.location,
        image: e.image,
        description: e.description,
        price: e.price,
        instagramLink: e.instagramLink,
        ticketLink: e.ticketLink
      }));

    return [...staticEvents, ...apiEvents];
  }, [eventsFromApi]);

  return (
    <div>
      <Header />
      <main className="container">
        <div className="page-header">
          <h1>Palcos 🎭</h1>
          <p>Teatro, shows e as melhores apresentações musicais do Recife</p>
        </div>

        {/* SEÇÃO DE EVENTOS/SHOWS (ESTILO GRID) */}
        <section className="grouped-category-section">
          <h2 className="section-title">Shows e Eventos</h2>
          <div className="events-grid">
            {palcosEvents.length === 0 ? (
              <p className="empty-state">Buscando novos shows... 🎸</p>
            ) : (
              palcosEvents.map(event => <EventCard key={event.id} event={event} />)
            )}
          </div>
        </section>

        {/* SEÇÃO DE TEATROS (ESTILO LISTAGEM POR LOCAL) */}
        <section className="grouped-category-section" style={{ marginTop: '50px' }}>
          <h2 className="section-title">Teatros em Cartaz</h2>
          {teatroData.map(teatro => (
            <article className="teatro-group cinema-group" key={teatro.name} style={{ marginTop: '20px' }}>
              <h2>{teatro.name}</h2>
              <p style={{ color: 'var(--secondary-color)', marginBottom: 20, fontSize: '0.9rem' }}>
                <i className="fas fa-map-marker-alt"></i> {teatro.location}
              </p>

              {teatro.shows.map(show => (
                <div className="show-listing movie-listing" key={show.title}>
                  <div className="show-poster movie-poster">
                    <img src={show.poster} alt={show.title} />
                  </div>
                  <div className="show-details movie-details">
                    <h3>
                      {show.title}
                      <span className={`rating-badge ${getRatingClass(show.rating)}`}>{show.rating}</span>
                    </h3>
                    <p className="genre">{show.genre}</p>
                    <div className="session-times">
                      <h4>Sessões</h4>
                      <div className="session-list">
                        {show.sessions.map((s, i) => (
                          <button
                            key={i}
                            className="session-btn session-link"
                            onClick={() => setModal({ teatroName: teatro.name, showTitle: show.title, session: s })}
                          >
                            {s.date} às {s.time} — {s.price}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </article>
          ))}
        </section>
      </main>

      {modal && <ShowModal details={modal} onClose={() => setModal(null)} />}
      <Footer />
    </div>
  )
}
