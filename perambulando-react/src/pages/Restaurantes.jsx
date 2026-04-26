import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { foodData } from '../data/data'

const CATEGORIES = ['Todos', 'Restaurante', 'Bar', 'Comida de Rua']

export default function Restaurantes() {
  const [filter, setFilter] = useState('Todos')

  const filtered = filter === 'Todos' ? foodData : foodData.filter(f => f.category === filter)

  return (
    <div>
      <Header />
      <main className="container">
        <div className="page-header">
          <h1>Guia Gastronômico 🍽️</h1>
          <p>Restaurantes, bares e a melhor comida do Recife</p>
        </div>

        <nav className="filter-nav">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="food-grid">
          {filtered.map(item => (
            <div className="food-card" key={item.id}>
              <img src={item.image} alt={item.name} className="food-card-image" />
              <div className="food-card-content">
                <div className="food-card-header">
                  <h3>{item.name}</h3>
                  <span className="price-badge">{item.priceRange}</span>
                </div>
                <span className="cuisine-badge">{item.cuisine}</span>
                <p><i className="fas fa-map-marker-alt"></i> {item.location}</p>
                <p className="specialty"><i className="fas fa-star"></i> {item.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
