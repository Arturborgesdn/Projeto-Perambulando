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

export function Palcos() {
  return <CategoryPage title="Palcos" emoji="🎭" category="Palcos" description="Teatro, shows e as melhores apresentações nos palcos do Recife" />
}

export function Telas() {
  return <CategoryPage title="Telas" emoji="🎬" category="Telas" description="Cinema, festivais audiovisuais e o melhor da sétima arte" />
}

export function Artes() {
  return <CategoryPage title="Artes" emoji="🖼️" category="Artes" description="Exposições, artes visuais e cultura" />
}

export function Rua() {
  return <CategoryPage title="Rua" emoji="🏙️" category="Rua" description="Eventos ao ar livre, lazer e ocupação urbana" />
}

export function Infantil() {
  return <CategoryPage title="Infantil" emoji="🧒" category="Infantil" description="Diversão garantida para toda a família" />
}

// Mantendo exportações antigas para compatibilidade de rotas se necessário
export const Shows = Palcos;
export const Exposicoes = Artes;
export const Lazer = Rua;
