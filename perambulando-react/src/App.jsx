import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cinema from './pages/Cinema'
import Teatro from './pages/Teatro'
import Restaurantes from './pages/Restaurantes'
import Feiras from './pages/Feiras'
import Shows from './pages/Shows'
import Exposicoes from './pages/Exposicoes'
import Lazer from './pages/Lazer'
import Infantil from './pages/Infantil'
import EventosDoDia from './pages/EventosDoDia'
import RoteiroProntos from './pages/RoteiroProntos'
import Painel from './pages/Painel'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Evento from './pages/Evento'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/teatro" element={<Teatro />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/feiras" element={<Feiras />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/exposicoes" element={<Exposicoes />} />
        <Route path="/lazer" element={<Lazer />} />
        <Route path="/infantil" element={<Infantil />} />
        <Route path="/eventos-do-dia" element={<EventosDoDia />} />
        <Route path="/roteiros" element={<RoteiroProntos />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/evento/:id" element={<Evento />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
