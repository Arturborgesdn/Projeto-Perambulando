import { useState, useMemo, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import Carousel from '../components/Carousel'
import { cinemaData, teatroData, feirasData } from '../data/data'

const CATEGORIES_WITH_ICONS = [
  { name: 'Todos', icon: 'fas fa-th-large' },
  { name: 'Shows', icon: 'fas fa-music' },
  { name: 'Cinema', icon: 'fas fa-film' },
  { name: 'Teatro', icon: 'fas fa-masks-theater' },
  { name: 'Exposições', icon: 'fas fa-palette' },
  { name: 'Feira', icon: 'fas fa-store' },
  { name: 'Lazer', icon: 'fas fa-umbrella-beach' },
  { name: 'Infantil', icon: 'fas fa-child' },
]

export default function Home() {
  const [eventsFromApi, setEventsFromApi] = useState([])
  const [search, setSearch] = useState('')
  const [price, setPrice] = useState('todos')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('Todos')
  const scrollRefs = useRef({})

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/eventos')
        const data = await response.json()
        setEventsFromApi(data)
      } catch (error) {
        console.error('Erro ao buscar eventos:', error)
      }
    }
    fetchEvents()
  }, [])

  const allUpcoming = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const all = []

    eventsFromApi.forEach(event => {
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
      all.push({ 
        id: `feira-${feira.id}`, 
        title: feira.name, 
        type: 'Feira', 
        date: new Date(), 
        location: feira.address, 
        image: feira.image || 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800', 
        link: '/feiras', 
        price: 0,
        days: feira.days,
        zone: feira.zone,
        feiraType: feira.type
      })
    )

    return all.filter(e => e.date >= today).sort((a, b) => a.date - b.date)
  }, [eventsFromApi])

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
  }, [allUpcoming, search, price, date, category])

  const grouped = useMemo(() => {
    if (category !== 'Todos') return null
    const groups = {}
    filtered.forEach(event => {
      if (!groups[event.type]) groups[event.type] = []
      groups[event.type].push(event)
    })
    return groups
  }, [filtered, category])

  const scroll = (catName, direction) => {
    const container = scrollRefs.current[catName]
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  function addToSchedule(feira) {
    const today = new Date().toISOString().split('T')[0]
    const newItem = {
      id: Date.now(),
      time: '08:00', // Horário padrão para feiras
      title: feira.title,
      details: `Feira em ${feira.location}`,
      type: 'event',
    }
    const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {}
    if (!schedule[today]) schedule[today] = []
    schedule[today].push(newItem)
    localStorage.setItem('userSchedule', JSON.stringify(schedule))
    alert(`"${feira.title}" foi adicionada à sua programação de hoje!`)
  }

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
        <Carousel events={allUpcoming} />
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
          <nav className="category-cards-nav">
            {CATEGORIES_WITH_ICONS.map(cat => (
              <div
                key={cat.name}
                className={`category-card-btn ${category === cat.name ? 'active' : ''}`}
                onClick={() => setCategory(cat.name)}
              >
                <i className={cat.icon}></i>
                <span>{cat.name}</span>
              </div>
            ))}
          </nav>
        </section>

        <section className="category-section">
          {filtered.length === 0 ? (
            <p className="empty-state">Nenhum evento encontrado. Tente outros filtros! 🧐</p>
          ) : (
            category === 'Todos' ? (
              Object.keys(grouped).map(catName => (
                <div key={catName} className="grouped-category-section">
                  <div className="section-header">
                    <h3 className="section-title">{catName}</h3>
                    {grouped[catName].length > 4 && (
                      <div className="scroll-controls">
                        <button onClick={() => scroll(catName, 'left')} className="scroll-btn">
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button onClick={() => scroll(catName, 'right')} className="scroll-btn">
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`events-grid small-cards ${grouped[catName].length > 4 ? 'horizontal-scroll' : ''}`}
                    ref={el => scrollRefs.current[catName] = el}
                  >
                    {grouped[catName].map(event => (
                      event.type === 'Feira' ? (
                        <div className="feira-card" key={event.id}>
                          <h3>{event.title}</h3>
                          <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                          <p><i className="far fa-calendar-alt"></i> {event.days}</p>
                          <span className="feira-tag">{event.feiraType}</span>
                          <button 
                            className="add-schedule-btn" 
                            style={{ marginTop: '10px', width: '100%' }}
                            onClick={() => addToSchedule(event)}
                          >
                            🗓️ Adicionar
                          </button>
                        </div>
                      ) : (
                        <EventCard key={event.id} event={event} isSmall={true} />
                      )
                    ))}
                  </div>
                </div>
              ))
            ) : category === 'Feira' ? (
              <div className="feiras-grid">
                {filtered.map(feira => (
                  <div className="feira-card" key={feira.id}>
                    <h3>{feira.title}</h3>
                    <p><i className="fas fa-map-marker-alt"></i> {feira.location}</p>
                    <p><i className="far fa-calendar-alt"></i> {feira.days}</p>
                    <p><i className="fas fa-compass"></i> Zona {feira.zone}</p>
                    <span className="feira-tag">{feira.feiraType}</span>
                    <button 
                      className="add-schedule-btn" 
                      style={{ marginTop: '15px', width: '100%' }}
                      onClick={() => addToSchedule(feira)}
                    >
                      🗓️ Adicionar à Programação
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="events-grid">
                {filtered.map(event => <EventCard key={event.id} event={event} />)}
              </div>
            )
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
