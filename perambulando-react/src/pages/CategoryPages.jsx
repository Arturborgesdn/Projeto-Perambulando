import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { mockEventsData } from '../data/data'

function CategoryPage({ title, emoji, category, description }) {
  const events = mockEventsData
    .filter(e => e.category === category)
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
          <h1>{emoji} {title}</h1>
          <p>{description}</p>
        </div>
        <div className="events-grid">
          {events.length === 0 ? (
            <p className="empty-state">Nenhum evento desta categoria no momento. Em breve novidades! 🎉</p>
          ) : (
            events.map(e => <EventCard key={e.id} event={e} />)
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function Shows() {
  return <CategoryPage title="Shows" emoji="🎵" category="Shows" description="Os melhores shows e apresentações musicais do Recife" />
}

export function Exposicoes() {
  return <CategoryPage title="Exposições" emoji="🖼️" category="Exposições" description="Arte, cultura e exposições imperdíveis" />
}

export function Lazer() {
  return <CategoryPage title="Programas de Lazer" emoji="🌿" category="Lazer" description="Passeios, atividades e diversão ao ar livre" />
}

export function Infantil() {
  return <CategoryPage title="Programas Infantis" emoji="🧒" category="Infantil" description="Diversão garantida para toda a família" />
}
