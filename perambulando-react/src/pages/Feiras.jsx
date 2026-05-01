import Header from '../components/Header'
import Footer from '../components/Footer'
import { feirasData } from '../data/data'

export default function Feiras() {
  function addToSchedule(feira) {
    const today = new Date().toISOString().split('T')[0]
    const newItem = {
      id: Date.now(),
      time: feira.time.split(' ')[0], // Pega o primeiro horário como referência
      title: feira.name,
      details: feira.address,
      type: 'event',
    }
    const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {}
    if (!schedule[today]) schedule[today] = []
    schedule[today].push(newItem)
    localStorage.setItem('userSchedule', JSON.stringify(schedule))
    alert(`"${feira.name}" foi adicionada à sua programação de hoje!`)
  }

  return (
    <div>
      <Header />
      <main className="container">
        <div className="page-header">
          <h1>Feiras de Recife 🛒</h1>
          <p>Artesanato, orgânicos, gastronomia e muito mais</p>
        </div>

        <div className="feiras-grid">
          {feirasData.map(feira => (
            <div className="feira-card" key={feira.id}>
              <h3>{feira.name}</h3>
              <p><i className="fas fa-map-marker-alt"></i> {feira.address}</p>
              <p><i className="far fa-calendar-alt"></i> {feira.days}</p>
              <p><i className="far fa-clock"></i> {feira.time}</p>
              <p><i className="fas fa-compass"></i> Zona {feira.zone}</p>
              <span className="feira-tag">{feira.type}</span>
              
              <button 
                className="action-icon-btn schedule-mini btn-add-schedule" 
                style={{ marginTop: '15px', width: '100%', height: '40px', gap: '10px' }}
                onClick={() => addToSchedule(feira)}
              >
                <i className="far fa-calendar-plus"></i> Adicionar à Programação
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
