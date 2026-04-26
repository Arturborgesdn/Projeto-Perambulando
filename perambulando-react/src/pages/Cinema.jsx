import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { cinemaData } from '../data/data'

function generateDates() {
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      label: i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' }),
      value: d.toISOString().split('T')[0],
    }
  })
}

const DATES = generateDates()

function getRatingClass(rating) {
  if (!rating) return ''
  return `rating-${rating.split(' ')[0].toLowerCase()}`
}

function SessionModal({ details, onClose }) {
  if (!details) return null
  const { cinemaName, movieTitle, sessionTime, sessionType, date } = details
  const movie = cinemaData.flatMap(c => c.movies).find(m => m.title === movieTitle)
  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })

  function addToSchedule() {
    const dateObj = new Date(`${date}T${sessionTime}`)
    const dateKey = date
    const newItem = {
      id: Date.now(),
      time: sessionTime,
      title: movieTitle,
      details: cinemaName,
      type: 'event',
    }
    const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {}
    if (!schedule[dateKey]) schedule[dateKey] = []
    schedule[dateKey].push(newItem)
    localStorage.setItem('userSchedule', JSON.stringify(schedule))
    alert(`"${movieTitle}" adicionado à sua programação!`)
  }

  return (
    <>
      <div className="modal-overlay active" onClick={onClose}></div>
      <div className="modal active">
        <div className="modal-header">
          <h2>Detalhes da Sessão</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <h3>{movieTitle}</h3>
          <p><strong>Classificação:</strong> {movie?.rating}</p>
          <p><strong>Cinema:</strong> {cinemaName}</p>
          <p><strong>Sessão:</strong> {sessionTime} ({sessionType}) — {formattedDate}</p>
          <h3 style={{ marginTop: 16 }}>Sinopse</h3>
          <p>{movie?.synopsis}</p>
          <button className="add-schedule-btn" style={{ marginTop: 16 }} onClick={addToSchedule}>
            🗓️ Adicionar à Minha Programação
          </button>
        </div>
        <div className="modal-footer">
          <button className="buy-ticket-btn">Comprar Ingressos</button>
        </div>
      </div>
    </>
  )
}

export default function Cinema() {
  const [selectedDate, setSelectedDate] = useState(DATES[0].value)
  const [modalDetails, setModalDetails] = useState(null)

  const listingsForDate = cinemaData
    .map(cinema => {
      const movies = cinema.movies
        .map(movie => {
          const sessions = movie.sessions.filter(s => s.date === selectedDate)
          return sessions.length > 0 ? { ...movie, sessions } : null
        })
        .filter(Boolean)
      return movies.length > 0 ? { ...cinema, movies } : null
    })
    .filter(Boolean)

  return (
    <div>
      <Header />
      <main className="container">
        <div className="page-header">
          <h1>Em Cartaz nos Cinemas 🍿</h1>
          <p>Confira a programação completa do Recife e Região Metropolitana</p>
        </div>

        <div className="date-selector-container">
          {DATES.map(d => (
            <button
              key={d.value}
              className={selectedDate === d.value ? 'active' : ''}
              onClick={() => setSelectedDate(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div id="cinema-listings">
          {listingsForDate.length === 0 ? (
            <p className="empty-state">Nenhum filme em cartaz para esta data. 😥</p>
          ) : (
            listingsForDate.map(cinema => (
              <article className="cinema-group" key={cinema.name}>
                <h2>{cinema.name}</h2>
                {cinema.movies.map(movie => (
                  <div className="movie-listing" key={movie.title}>
                    <div className="movie-poster">
                      <img src={movie.poster} alt={`Pôster de ${movie.title}`} />
                    </div>
                    <div className="movie-details">
                      <h3>
                        {movie.title}
                        <span className={`rating-badge ${getRatingClass(movie.rating)}`}>{movie.rating}</span>
                      </h3>
                      <p className="genre">{movie.genre}</p>
                      <div className="session-times">
                        <h4>Horários</h4>
                        <div className="session-list">
                          {movie.sessions.map(s => (
                            <a
                              key={s.time}
                              className="session-link"
                              onClick={e => { e.preventDefault(); setModalDetails({ cinemaName: cinema.name, movieTitle: movie.title, sessionTime: s.time, sessionType: s.type, date: selectedDate }) }}
                              href="#"
                            >
                              {s.time}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </article>
            ))
          )}
        </div>
      </main>

      {modalDetails && <SessionModal details={modalDetails} onClose={() => setModalDetails(null)} />}
      <Footer />
    </div>
  )
}
