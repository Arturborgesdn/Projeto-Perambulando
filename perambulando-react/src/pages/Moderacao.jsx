import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Moderacao() {
  const [pendentes, setPendentes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPendentes()
  }, [])

  async function fetchPendentes() {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/admin/eventos/pendentes')
      const data = await response.json()
      setPendentes(data)
    } catch (error) {
      console.error('Erro ao buscar pendentes:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id, novoStatus) {
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/admin/eventos/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
      })

      if (response.ok) {
        setPendentes(pendentes.filter(p => p.id !== id))
        alert(`Evento ${novoStatus === 'APROVADO' ? 'aprovado' : 'rejeitado'} com sucesso!`)
      }
    } catch (error) {
      alert('Erro ao atualizar status.')
    }
  }

  return (
    <div>
      <Header />
      <main className="container">
        <div className="page-header">
          <h1>🛡️ Painel de Moderação</h1>
          <p>Analise os eventos enviados pelos usuários antes de publicá-los.</p>
        </div>

        {loading ? (
          <p>Carregando eventos...</p>
        ) : pendentes.length === 0 ? (
          <p className="empty-state">Não há eventos pendentes para análise no momento. 🙌</p>
        ) : (
          <div className="events-grid">
            {pendentes.map(evento => (
              <div className="event-card" key={evento.id} style={{ cursor: 'default' }}>
                <img src={evento.image} alt={evento.title} />
                <div className="event-info">
                  <span className="category">{evento.category}</span>
                  <h3>{evento.title}</h3>
                  <p><i className="fas fa-map-marker-alt"></i> {evento.location}</p>
                  <p><i className="far fa-calendar-alt"></i> {new Date(evento.date).toLocaleString()}</p>
                  <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>{evento.description}</p>
                </div>
                <div className="event-actions-bar">
                  <button 
                    className="action-icon-btn ticket" 
                    onClick={() => updateStatus(evento.id, 'APROVADO')}
                    style={{ flex: 2 }}
                  >
                    ✅ Aprovar
                  </button>
                  <button 
                    className="action-icon-btn instagram" 
                    onClick={() => updateStatus(evento.id, 'REJEITADO')}
                  >
                    ❌ Rejeitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
