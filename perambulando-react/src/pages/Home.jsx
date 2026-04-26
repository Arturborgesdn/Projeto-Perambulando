import { useState, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import { mockEventsData, cinemaData, teatroData, feirasData } from '../data/data'

function buildAllEvents() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const all = []

  mockEventsData.forEach(event => {
    let priceValue = 0
    if (event.price && !['gratuito', 'entrada gratuita'].includes(event.price.toLowerCase())) {
      priceValue = parseFloat(event.price.replace('R$', '').replace(',', '.')) || 1
    }
    all.push({
      id: `event-${event.id}`,
      title: event.title,
      type: event.category,
      date: new Date(event.date),
      location: event.location,
      image: event.image,
      link: `/evento/${event.id}`,
      price: priceValue,
    })
  })

  cinemaData.forEach(cinema =>
    cinema.movies.forEach(movie => {
      const first = movie.sessions
        .map(s => new Date(`${s.date}T${s.time}`))
        .filter(d => d >= today)
        .sort((a, b) => a - b)[0]
      if (first) {
        all.push({ id: `cinema-${movie.title}`, title: movie.title, type: 'Cinema', date: first, location: cinema.name, image: movie.poster, link: '/cinema', price: 1 })
      }
    })
  )

  teatroData.forEach(teatro =>
    teatro.shows.forEach(show => {
      const first = show.sessions
        .filter(s => new Date(`${s.date}T${s.time}`) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0]
      if (first) {
        all.push({ id: `teatro-${show.title}`, title: show.title, type: 'Teatro', date: new Date(`${first.date}T${first.time}`), location: teatro.name, image: show.poster, link: '/teatro', price: parseFloat(first.price.replace('R$', '')) || 1 })
      }
    })
  )

  feirasData.forEach(feira =>
    all.push({ id: `feira-${feira.id}`, title: feira.name, type: 'Feira', date: new Date(), location: feira.address, image: 'https://i.imgur.com/c5Bv6g5.jpg', link: '/feiras', price: 0 })
  )

  return all.filter(e => e.date >= today).sort((a, b) => a.date - b.date)
}

const allUpcoming = buildAllEvents()

const CATEGORIES = ['Todos', 'Shows', 'Cinema', 'Teatro', 'Exposições', 'Feira', 'Lazer', 'Infantil']

export default function Home() {
  const [search, setSearch] = useState('')
  const [price, setPrice] = useState('todos')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('Todos')

  const filtered = useMemo(() => {
    let result = allUpcoming

    if (category !== 'Todos') result = result.filter(e => e.type === category)

    switch (price) {
      case 'gratuito': result = result.filter(e => e.price === 0); break
      case 'range1': result = result.filter(e => e.price > 0 && e.price <= 20); break
      case 'range2': result = result.filter(e => e.price > 20 && e.price <= 50); break
      case 'range3': result = result.filter(e => e.price > 50 && e.price <= 100); break
      case 'range4': result = result.filter(e => e.price > 100); break
    }

    if (date) result = result.filter(e => e.date.toISOString().split('T')[0] === date)

    if (search.trim()) result = result.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))

    return result
  }, [search, price, date, category])

  function clearFilters() {
    setSearch('')
    setPrice('todos')
    setDate('')
    setCategory('Todos')
  }

  return (
    <div>
      <Header />
      <main className="container">
        <section className="search-filter-box">
          <h2>Encontre o rolê perfeito! 😉</h2>

          <form id="search-form" className="main-filters" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Busque por nome..."
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="filter-select" value={price} onChange={e => setPrice(e.target.value)}>
              <option value="todos">Qualquer Preço</option>
              <option value="gratuito">Gratuito</option>
              <option value="range1">$ (até R$20)</option>
              <option value="range2">$$ (R$21 a R$50)</option>
              <option value="range3">$$$ (R$51 a R$100)</option>
              <option value="range4">$$$$+ (Acima de R$100)</option>
            </select>
            <input
              type="date"
              className="filter-select"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <button type="button" className="clear-btn" onClick={clearFilters}>Limpar</button>
          </form>

          <nav className="filter-nav">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
        </section>

        <section className="category-section">
          <div className="events-grid">
            {filtered.length === 0 ? (
              <p className="empty-state">Nenhum evento encontrado. Tente outros filtros! 🧐</p>
            ) : (
              filtered.map(event => <EventCard key={event.id} event={event} />)
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
