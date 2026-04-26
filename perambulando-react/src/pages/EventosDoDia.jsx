import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { mockEventsData } from '../data/data'

export default function EventosDoDia() {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const events = mockEventsData
    .filter(e => e.date.startsWith(todayStr))
    .map(e => ({
      id: e.id,
      title: e.title,
      type: e.category,
      date: new Date(e.date),
      location: e.location,
      image: e.image,
      link: `/evento/${e.id}`,
      price: e.price,
    }))

  return (
    <div>
      <Header />
      <main className="container">
        <div className="page-header">
          <h1>🔥 Eventos de Hoje</h1>
          <p>
            {today.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="events-grid">
          {events.length === 0 ? (
            <p className="empty-state">Nenhum evento cadastrado para hoje. Explore outras datas na página inicial! 🗓️</p>
          ) : (
            events.map(e => <EventCard key={e.id} event={e} />)
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
