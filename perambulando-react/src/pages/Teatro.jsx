import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { teatroData } from '../data/data'

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
            <button className="btn-submit" onClick={addToSchedule}>
              🗓️ Adicionar à Minha Programação
            </button>
            {teatro?.instagramLink && (
              <a href={teatro.instagramLink} target="_blank" rel="noopener noreferrer" className="btn-instagram">
                <i className="fab fa-instagram"></i> Ver Teatro no Instagram
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

  return (
    <div>
      <Header />
      <main className="container">
        <div className="page-header">
          <h1>Teatro em Cartaz 🎭</h1>
          <p>Peças e musicais nos palcos do Recife</p>
        </div>

        {teatroData.map(teatro => (
          <article className="teatro-group cinema-group" key={teatro.name}>
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
      </main>

      {modal && <ShowModal details={modal} onClose={() => setModal(null)} />}
      <Footer />
    </div>
  )
}
