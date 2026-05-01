import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há um usuário logado no localStorage
    const checkLogin = () => {
      const user = localStorage.getItem('currentUser');
      setIsLoggedIn(!!user);
    };

    checkLogin();
    // Escuta mudanças no localStorage (caso o login ocorra em outra aba ou via evento customizado)
    window.addEventListener('storage', checkLogin);
    
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    closeMenu();
    navigate('/');
    // Força um pequeno refresh ou evento para outros componentes que dependem do login
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      <header>
        <div className="container">
          <button
            className="menu-btn"
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            <i className="fas fa-bars"></i>
          </button>

          <Link to="/" className="logo-container">
            <img src="/logo.png" alt="Logo Perambulando" className="logo-img" />
          </Link>

          <div className="header-right-placeholder" style={{ width: '42px' }}></div>
        </div>
      </header>

      <nav
        className={`side-menu ${menuOpen ? "open" : ""}`}
        style={menuOpen ? { transform: "translateX(0)" } : {}}
      >
        <Link to="/" onClick={closeMenu}>
          Início
        </Link>
        <div className="menu-divider" style={{ padding: '10px 30px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Categorias</div>
        <Link to="/palcos" onClick={closeMenu}><i className="fas fa-masks-theater" style={{ marginRight: '10px' }}></i> Palcos</Link>
        <Link to="/telas" onClick={closeMenu}><i className="fas fa-film" style={{ marginRight: '10px' }}></i> Telas</Link>
        <Link to="/artes" onClick={closeMenu}><i className="fas fa-palette" style={{ marginRight: '10px' }}></i> Artes</Link>
        <Link to="/rua" onClick={closeMenu}><i className="fas fa-map-signs" style={{ marginRight: '10px' }}></i> Rua</Link>
        <Link to="/infantil" onClick={closeMenu}><i className="fas fa-child" style={{ marginRight: '10px' }}></i> Infantil</Link>
        
        <div className="menu-divider" style={{ padding: '10px 30px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Explorar</div>
        <Link to="/seu-evento" onClick={closeMenu}>
          Divulgue seu Evento
        </Link>
        <Link to="/roteiros" onClick={closeMenu}>
          Roteiros Prontos
        </Link>
        <Link to="/eventos-do-dia" onClick={closeMenu}>
          Eventos do Dia
        </Link>
        <Link
          to="/painel"
          onClick={closeMenu}
          className="minha-programacao-link"
        >
          Minha Programação
        </Link>
        {isLoggedIn ? (
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            Sair da Conta
          </a>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Login / Cadastro
          </Link>
        )}
      </nav>

      {menuOpen && (
        <div
          id="overlay"
          style={{ opacity: 1, visibility: "visible" }}
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
}
