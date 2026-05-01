import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/moderacao.css'

export default function Moderacao() {
  const [pendentes, setPendentes] = useState([])
  const [loading, setLoading] = useState(true)
  const [robotLoading, setRobotLoading] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

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

  async function runRobot() {
    setRobotLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:3001/api/admin/robot/run', { method: 'POST' })
      const data = await response.json()
      alert(data.message)
      setTimeout(fetchPendentes, 3000)
    } catch (error) {
      alert('Erro ao iniciar o robô.')
    } finally {
      setRobotLoading(false)
    }
  }

  async function handleAction(id, novoStatus, updatedData = null) {
    const payload = updatedData ? { ...updatedData, status: novoStatus } : { status: novoStatus };
    
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/admin/eventos/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        setPendentes(pendentes.filter(p => p.id !== id))
        setEditingEvent(null)
      }
    } catch (error) {
      console.error('Erro ao processar ação.')
    }
  }

  async function handleUpdate(id, status, data) {
    await handleAction(id, status, data);
  }

  const openEditor = (evento) => {
    try {
      // Formata a data para o input datetime-local (YYYY-MM-DDTHH:mm)
      const dateObj = new Date(evento.date);
      let dateString = "";
      
      if (!isNaN(dateObj.getTime())) {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
      } else {
        dateString = new Date().toISOString().slice(0, 16);
      }
      
      setEditingEvent({ ...evento, date: dateString });
    } catch (e) {
      console.error("Erro ao abrir editor:", e);
    }
  }

  return (
    <div>
      <Header />
      <main className="container wide-admin">
        <div className="page-header moderation-header">
          <div>
            <h1>🛡️ Gestão de Eventos</h1>
            <p>Lista de eventos aguardando revisão. Analise os dados na planilha abaixo.</p>
          </div>
          <button className="btn-submit robot-btn" onClick={runRobot} disabled={robotLoading}>
            {robotLoading ? '🤖 Buscando...' : '🤖 Rodar Robô'}
          </button>
        </div>

        {loading ? <p>Carregando planilha...</p> : pendentes.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum evento pendente. Tudo em dia! 🙌</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nome do Evento</th>
                  <th>Categoria</th>
                  <th>Local</th>
                  <th>Data/Hora</th>
                  <th>Valor</th>
                  <th>Links</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pendentes.map(evento => (
                  <tr key={evento.id}>
                    <td>
                      <img src={evento.image} alt="Thumb" className="table-thumb" />
                    </td>
                    <td><div className="table-cell-title">{evento.title}</div></td>
                    <td><span className="table-badge">{evento.category}</span></td>
                    <td><div className="table-cell-text">{evento.location}</div></td>
                    <td>{new Date(evento.date).toLocaleString('pt-BR')}</td>
                    <td>{evento.price || 'N/A'}</td>
                    <td>
                      <div className="table-links-status">
                        {evento.ticketLink && <i className="fas fa-ticket-alt" title="Tem link de compra"></i>}
                        {evento.instagramLink && <i className="fab fa-instagram" title="Tem Instagram"></i>}
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-action edit" onClick={() => openEditor(evento)}>Editar</button>
                        <button className="btn-action accept" onClick={() => handleAction(evento.id, 'APROVADO')}>Aceitar</button>
                        <button className="btn-action reject" onClick={() => handleAction(evento.id, 'REJEITADO')}>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL DE EDIÇÃO */}
        {editingEvent && (
          <div className="modal-overlay" style={{ display: 'flex' }} onClick={() => setEditingEvent(null)}>
            <div className="form-container wide" onClick={e => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={() => setEditingEvent(null)}>&times;</button>
              <h2>Revisar Informações</h2>
              <div className="form-grid">
                <div className="form-group"><label>Nome</label><input type="text" value={editingEvent.title} onChange={e => setEditingEvent({...editingEvent, title: e.target.value})} /></div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select value={editingEvent.category} onChange={e => setEditingEvent({...editingEvent, category: e.target.value})}>
                    <option value="Palcos">Palcos</option>
                    <option value="Telas">Telas</option>
                    <option value="Artes">Artes</option>
                    <option value="Rua">Rua</option>
                    <option value="Infantil">Infantil</option>
                  </select>
                </div>
                <div className="form-group"><label>Data/Hora</label><input type="datetime-local" value={editingEvent.date} onChange={e => setEditingEvent({...editingEvent, date: e.target.value})} /></div>
                <div className="form-group"><label>Local</label><input type="text" value={editingEvent.location} onChange={e => setEditingEvent({...editingEvent, location: e.target.value})} /></div>
                <div className="form-group"><label>Valor</label><input type="text" value={editingEvent.price || ''} onChange={e => setEditingEvent({...editingEvent, price: e.target.value})} /></div>
                <div className="form-group"><label>URL Imagem</label><input type="text" value={editingEvent.image} onChange={e => setEditingEvent({...editingEvent, image: e.target.value})} /></div>
                <div className="form-group"><label>Link Instagram</label><input type="text" value={editingEvent.instagramLink || ''} onChange={e => setEditingEvent({...editingEvent, instagramLink: e.target.value})} /></div>
                <div className="form-group"><label>Link Compra</label><input type="text" value={editingEvent.ticketLink || ''} onChange={e => setEditingEvent({...editingEvent, ticketLink: e.target.value})} /></div>
              </div>
              <div className="form-group"><label>Descrição</label><textarea className="form-textarea" rows="4" value={editingEvent.description} onChange={e => setEditingEvent({...editingEvent, description: e.target.value})}></textarea></div>
              <div className="modal-footer-actions">
                <button className="btn-submit" onClick={() => handleUpdate(editingEvent.id, 'APROVADO', editingEvent)}>✅ Salvar e Aceitar</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
