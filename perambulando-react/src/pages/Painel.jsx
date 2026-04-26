import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

export default function Painel() {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  const [selectedDate, setSelectedDate] = useState(getTodayString())
  const [schedule, setSchedule] = useState(() => JSON.parse(localStorage.getItem('userSchedule')) || {})
  const [noteTime, setNoteTime] = useState('')
  const [noteTitle, setNoteTitle] = useState('')

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [])

  function getItemsForDay(dateStr) {
    return (schedule[dateStr] || []).slice().sort((a, b) => a.time.localeCompare(b.time))
  }

  function addNote(e) {
    e.preventDefault()
    const newItem = {
      id: Date.now(),
      time: noteTime,
      title: noteTitle,
      details: 'Anotação Pessoal',
      type: 'note',
    }
    const updated = { ...schedule }
    if (!updated[selectedDate]) updated[selectedDate] = []
    updated[selectedDate] = [...updated[selectedDate], newItem]
    setSchedule(updated)
    localStorage.setItem('userSchedule', JSON.stringify(updated))
    setNoteTime('')
    setNoteTitle('')
  }

  function deleteItem(id) {
    const updated = { ...schedule }
    if (updated[selectedDate]) {
      updated[selectedDate] = updated[selectedDate].filter(item => item.id !== id)
      setSchedule(updated)
      localStorage.setItem('userSchedule', JSON.stringify(updated))
    }
  }

  const displayDate = new Date(`${selectedDate}T12:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long'
  })

  const items = getItemsForDay(selectedDate)

  if (!currentUser) return null

  return (
    <div>
      <Header />
      <main className="container">
        <div className="panel-header">
          <h2>Bem-vindo(a), {currentUser.email}! 👋</h2>
          <p>Organize seu dia e não perca nenhum evento!</p>
        </div>

        <div className="agenda-layout">
          <div className="agenda-controls">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 15 }}>Selecione o Dia</h3>
            <input
              type="date"
              className="filter-select"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{ width: '100%', marginBottom: 20 }}
            />

            <div className="add-note-form">
              <h4>Adicionar Anotação Pessoal</h4>
              <form onSubmit={addNote}>
                <input
                  type="time"
                  value={noteTime}
                  onChange={e => setNoteTime(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Ex: Jantar no Leite"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  required
                />
                <button type="submit">Adicionar</button>
              </form>
            </div>
          </div>

          <div className="agenda-list-container">
            <h3>Programação para {displayDate}</h3>
            <ul style={{ padding: 0 }}>
              {items.length === 0 ? (
                <li className="empty-state" style={{ listStyle: 'none' }}>
                  Nenhuma programação para este dia. Adicione eventos ou anotações!
                </li>
              ) : (
                items.map(item => (
                  <li key={item.id} className="schedule-item">
                    <div className="schedule-item-time">{item.time}</div>
                    <div className="schedule-item-content">
                      <h4>{item.title}</h4>
                      <p>{item.details}</p>
                    </div>
                    <button
                      className="schedule-item-delete"
                      onClick={() => deleteItem(item.id)}
                      title="Remover item"
                    >
                      &times;
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
