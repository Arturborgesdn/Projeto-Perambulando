import Header from '../components/Header'
import Footer from '../components/Footer'
import { roteirosData } from '../data/data'

export default function RoteiroProntos() {
  function addFullRoteiro(roteiro) {
    const today = new Date().toISOString().split('T')[0]
    const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {}
    
    if (!schedule[today]) schedule[today] = []

    // Adiciona cada parada do roteiro como um item individual na agenda
    roteiro.stops.forEach(stop => {
      const newItem = {
        id: Date.now() + Math.random(),
        time: stop.time,
        title: `${stop.place} (${roteiro.title})`,
        details: stop.details,
        type: 'event'
      }
      schedule[today].push(newItem)
    })

    localStorage.setItem('userSchedule', JSON.stringify(schedule))
    alert(`O roteiro "${roteiro.title}" foi adicionado completo à sua programação de hoje! 🚀`)
  }

  return (
    <div>
      <Header />
      <main className="container">
        <div className="page-header">
          <h1>🗺️ Roteiros Prontos</h1>
          <p>Sugestões de programação para aproveitar o melhor do Recife</p>
        </div>

        <div className="roteiros-grid">
          {roteirosData.map(roteiro => (
            <div className="roteiro-card" key={roteiro.id}>
              <img src={roteiro.image} alt={roteiro.title} />
              <div className="roteiro-card-body">
                <div className="roteiro-meta">
                  <span className="roteiro-tag">⏱ {roteiro.duration}</span>
                  <span className="roteiro-tag">🏷 {roteiro.category}</span>
                </div>
                <h3>{roteiro.title}</h3>
                <p style={{ marginBottom: '15px' }}>{roteiro.description}</p>
                
                <div className="roteiro-stops">
                  <h4>Paradas do Roteiro</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {roteiro.stops.map((stop, i) => (
                      <li key={i} style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                        <strong>{stop.time}</strong> - {stop.place}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  className="btn-submit" 
                  style={{ marginTop: '20px', width: '100%' }}
                  onClick={() => addFullRoteiro(roteiro)}
                >
                  🗓️ Agendar este Roteiro
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
