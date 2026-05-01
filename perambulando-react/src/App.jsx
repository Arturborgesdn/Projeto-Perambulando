import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cinema from './pages/Cinema'
import Teatro from './pages/Teatro'
import Restaurantes from './pages/Restaurantes'
import { Shows, Exposicoes, Lazer, Infantil, Telas, Palcos, Artes, Rua } from './pages/CategoryPages'
import EventosDoDia from './pages/EventosDoDia'
import RoteiroProntos from './pages/RoteiroProntos'
import Painel from './pages/Painel'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Evento from './pages/Evento'
import SeuEvento from './pages/SeuEvento'
import Moderacao from './pages/Moderacao'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema" element={<Telas />} />
        <Route path="/teatro" element={<Palcos />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        
        {/* Novas rotas de categoria consolidadas */}
        <Route path="/palcos" element={<Palcos />} />
        <Route path="/telas" element={<Telas />} />
        <Route path="/artes" element={<Artes />} />
        <Route path="/rua" element={<Rua />} />
        <Route path="/infantil" element={<Infantil />} />
        
        {/* Aliases para compatibilidade */}
        <Route path="/shows" element={<Shows />} />
        <Route path="/exposicoes" element={<Exposicoes />} />
        <Route path="/lazer" element={<Lazer />} />
        <Route path="/feiras" element={<Rua />} />

        <Route path="/eventos-do-dia" element={<EventosDoDia />} />
        <Route path="/roteiros" element={<RoteiroProntos />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/evento/:id" element={<Evento />} />
        <Route path="/seu-evento" element={<SeuEvento />} />
        <Route path="/moderacao" element={<Moderacao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
