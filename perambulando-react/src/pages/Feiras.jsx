import Header from '../components/Header'
import Footer from '../components/Footer'
import { feirasData } from '../data/data'

export default function Feiras() {
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
              <p><i className="fas fa-compass"></i> Zona {feira.zone}</p>
              <span className="feira-tag">{feira.type}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
