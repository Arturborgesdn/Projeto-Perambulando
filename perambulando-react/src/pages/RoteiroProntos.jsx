import Header from '../components/Header'
import Footer from '../components/Footer'
import { roteirosData } from '../data/data'

export default function RoteiroProntos() {
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
                <p>{roteiro.description}</p>
                <div className="roteiro-stops">
                  <h4>Paradas do Roteiro</h4>
                  <ol>
                    {roteiro.stops.map((stop, i) => (
                      <li key={i}>{stop}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
