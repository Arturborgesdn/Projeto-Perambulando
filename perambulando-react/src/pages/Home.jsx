import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import Carousel from '../components/Carousel'
import { cinemaData, teatroData, feirasData, mockEventsData } from '../data/data'

const CATEGORIES_WITH_ICONS = [
  { name: 'Todos', icon: 'fas fa-th-large' },
  { name: 'Palcos', icon: 'fas fa-masks-theater' }, // Teatro + Shows
  { name: 'Telas', icon: 'fas fa-film' },           // Cinema
  { name: 'Artes', icon: 'fas fa-palette' },        // Exposições
  { name: 'Rua', icon: 'fas fa-map-signs' },        // Feiras + Lazer
  { name: 'Infantil', icon: 'fas fa-child' },       // Infantil
]

const getCategoryRoute = (category) => {
  const map = {
    'Palcos': '/palcos',
    'Telas': '/telas',
    'Artes': '/artes',
    'Rua': '/rua',
    'Infantil': '/infantil',
    'Cinema': '/telas',
    'Teatro': '/palcos',
    'Restaurantes': '/restaurantes',
    'Feiras': '/rua',
    'Shows': '/palcos',
    'Exposições': '/artes',
    'Lazer': '/rua'
  };
  return map[category] || '/';
};

export default function Home() {
  const [eventsFromApi, setEventsFromApi] = useState([])
  const [search, setSearch] = useState('')
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
    const all = []
    const uniqueCinemas = new Set();

    eventsFromApi.forEach(event => {
      const originalCat = event.category || ''
      let consolidatedType = originalCat

      // Mapeamento para novas categorias (Suporta nomes antigos e novos)
      if (['Cinema', 'Telas'].includes(originalCat)) consolidatedType = 'Telas'
      else if (['Teatro', 'Shows', 'Palcos'].includes(originalCat)) consolidatedType = 'Palcos'
      else if (['Exposições', 'Artes'].includes(originalCat)) consolidatedType = 'Artes'
      else if (['Feira', 'Lazer', 'Rua'].includes(originalCat)) consolidatedType = 'Rua'
      else if (['Infantil'].includes(originalCat)) consolidatedType = 'Infantil'

      if (consolidatedType === 'Telas') {
        const locations = event.location.split('/').map(l => l.trim());
        locations.forEach(loc => {
          if (!uniqueCinemas.has(loc)) {
            uniqueCinemas.add(loc);
            all.push({
              id: `cinema-group-${loc}`,
              title: loc,
              type: 'Telas',
              date: new Date(),
              location: 'Recife',
              image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800',
              link: '/telas',
              price: 1
            });
          }
        });
      } else {
        let priceValue = 0
        if (event.price && !['gratuito', 'entrada gratuita'].includes(event.price.toLowerCase())) {
          priceValue = parseFloat(event.price.replace('R$', '').replace(',', '.')) || 1
        }
        all.push({
          id: `event-${event.id}`,
          title: event.title,
          type: consolidatedType,
          date: new Date(event.date),
          location: event.location,
          image: event.image,
          link: getCategoryRoute(consolidatedType),
          price: priceValue,
        })
      }
    })

    teatroData.forEach(teatro =>
      teatro.shows.forEach(show => {
        all.push({ id: `teatro-${show.title}`, title: show.title, type: 'Palcos', date: new Date(), location: teatro.name, image: show.poster, link: '/palcos', price: 1 })
      })
    )

    feirasData.forEach(feira =>
      all.push({ 
        id: `feira-${feira.id}`, 
        title: feira.name, 
        type: 'Rua', 
        date: new Date(), 
        location: feira.address, 
        image: feira.image, 
        link: '/rua', 
        price: 0,
        days: feira.days,
        time: feira.time,
        feiraType: feira.type
      })
    )

    mockEventsData.forEach(event => {
      all.push({
        ...event,
        id: `mock-${event.id}`,
        date: new Date(event.date),
        link: getCategoryRoute(event.category),
        type: event.category 
      })
    })

    return all.sort((a, b) => b.date - a.date)
  }, [eventsFromApi])

  const filtered = useMemo(() => {
    let result = allUpcoming
    if (category !== 'Todos') result = result.filter(e => e.type === category)
    if (search.trim()) result = result.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    return result
  }, [allUpcoming, search, category])

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
    const newItem = { id: Date.now(), time: '08:00', title: feira.title, details: `Feira em ${feira.location}`, type: 'event' }
    const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {}
    if (!schedule[today]) schedule[today] = []
    schedule[today].push(newItem)
    localStorage.setItem('userSchedule', JSON.stringify(schedule))
    alert(`"${feira.title}" foi adicionada à sua programação!`)
  }

  return (
    <div>
      <Header />
      <main className="container">
        <section className="welcome-section">
          <div className="welcome-content">
            <h1>Descubra o melhor do Recife. Vamos perambular? 🗺️✨</h1>
            <p>
              Somos o seu guia cultural definitivo. Explore shows, exposições, eventos de rua e o que há de novo nos cinemas e teatros da nossa cidade.
            </p>
            <div className="features-mini-grid">
              <Link to="/painel" className="feature-item">
                <i className="fas fa-calendar-alt"></i>
                <span>Minha Programação</span>
              </Link>
              <Link to="/eventos-do-dia" className="feature-item">
                <i className="fas fa-bolt"></i>
                <span>Eventos do Dia</span>
              </Link>
              <Link to="/roteiros" className="feature-item">
                <i className="fas fa-map-marked-alt"></i>
                <span>Roteiros Prontos</span>
              </Link>
            </div>
          </div>
          <div className="welcome-cta-box">
            <h3>É produtor ou conhece um evento? 📢</h3>
            <p>
              O Perambulando cresce com a sua ajuda! Divulgue seu evento gratuitamente e ajude a fortalecer a cena cultural de Recife.
            </p>
            <Link to="/seu-evento" className="btn-submit welcome-btn">
              <i className="fas fa-plus-circle"></i> Divulgue seu Evento
            </Link>
          </div>
        </section>

        <Carousel events={allUpcoming.filter(e => e.type !== 'Cinema')} />
        
        <section className="search-filter-box">
          <h2>Encontre o rolê perfeito! 😉</h2>
          <form id="search-form" className="main-filters" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Busque por nome..." className="search-input" value={search} onChange={e => setSearch(e.target.value)} />
            <button type="button" className="clear-btn" onClick={() => { setSearch(''); setCategory('Todos'); }}>Limpar</button>
          </form>
          <nav className="category-cards-nav">
            {CATEGORIES_WITH_ICONS.map(cat => (
              <div key={cat.name} className={`category-card-btn ${category === cat.name ? 'active' : ''}`} onClick={() => setCategory(cat.name)}>
                <i className={cat.icon}></i>
                <span>{cat.name}</span>
              </div>
            ))}
          </nav>
        </section>

        <section className="category-section">
          {filtered.length === 0 ? (
            <p className="empty-state">Nenhum evento encontrado. 🧐</p>
          ) : (
            category === 'Todos' ? (
              Object.keys(grouped).map(catName => (
                <div key={catName} className="grouped-category-section">
                  <div className="section-header">
                    <Link to={getCategoryRoute(catName)} style={{ textDecoration: 'none' }}>
                      <h3 className="section-title">{catName}</h3>
                    </Link>
                    {grouped[catName].length > 4 && (
                      <div className="scroll-controls">
                        <button onClick={() => scroll(catName, 'left')} className="scroll-btn"><i className="fas fa-chevron-left"></i></button>
                        <button onClick={() => scroll(catName, 'right')} className="scroll-btn"><i className="fas fa-chevron-right"></i></button>
                      </div>
                    )}
                  </div>
                  <div className={`events-grid small-cards ${grouped[catName].length > 4 ? 'horizontal-scroll' : ''}`} ref={el => scrollRefs.current[catName] = el}>
                    {grouped[catName].map(event => (
                      <EventCard key={event.id} event={event} isSmall={true} />
                    ))}
                  </div>
                </div>
              ))
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
