import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header>
        <div className="container">
          <button className="menu-btn" onClick={toggleMenu} aria-label="Abrir menu">
            <i className="fas fa-bars"></i>
          </button>

          <Link to="/" className="logo-container">
            <img src="/logo.png" alt="Logo Perambulando" className="logo-img" />
          </Link>

          <div className="user-profile">
            <Link to="/seu-evento" title="Divulgue seu Evento">
              <i className="fas fa-plus-circle"></i>
            </Link>
            <Link to="/painel" title="Minha Programação">
              <i className="far fa-calendar-alt"></i>
            </Link>
            <Link to="/login" title="Entrar">
              <i className="fas fa-user-circle"></i>
            </Link>
          </div>
        </div>
      </header>

      <nav className={`side-menu ${menuOpen ? 'open' : ''}`} style={menuOpen ? { transform: 'translateX(0)' } : {}}>
        <Link to="/" onClick={closeMenu}>Início</Link>
        <Link to="/seu-evento" onClick={closeMenu}>Divulgue seu Evento</Link>
        <Link to="/roteiros" onClick={closeMenu}>Roteiros Prontos</Link>
        <Link to="/eventos-do-dia" onClick={closeMenu}>Eventos do Dia</Link>
        <Link to="/painel" onClick={closeMenu}>Minha Programação</Link>
        <Link to="/login" onClick={closeMenu}>Login / Cadastro</Link>
      </nav>

      {menuOpen && (
        <div id="overlay" style={{ opacity: 1, visibility: 'visible' }} onClick={closeMenu}></div>
      )}
    </>
  )
}
