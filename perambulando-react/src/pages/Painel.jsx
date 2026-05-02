import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import html2canvas from 'html2canvas'
import Header from '../components/Header'
import Footer from '../components/Footer'

function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

export default function Painel() {
  const navigate = useNavigate()
  const trilhaRef = useRef(null)
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  const [selectedDate, setSelectedDate] = useState(getTodayString())
  const [schedule, setSchedule] = useState(() => JSON.parse(localStorage.getItem('userSchedule')) || {})
  const [noteTime, setNoteTime] = useState('')
  const [noteTitle, setNoteTitle] = useState('')

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [])

  async function exportAsImage() {
    if (!trilhaRef.current) return;
    
    // Pequeno feedback visual antes de capturar
    const btn = document.querySelector('.export-btn');
    const originalText = btn.innerHTML;
    btn.innerText = 'Gerando imagem...';

    try {
      const canvas = await html2canvas(trilhaRef.current, {
        backgroundColor: '#F7FFF7',
        scale: 2, // Melhor qualidade
        logging: false,
        useCORS: true
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `meu-roteiro-${selectedDate}.png`;
      link.click();
    } catch (err) {
      console.error('Erro ao exportar:', err);
    } finally {
      btn.innerHTML = originalText;
    }
  }

  function shareToWhatsApp() {
    const items = getItemsForDay(selectedDate);
    if (items.length === 0) return alert('Sua programação está vazia!');

    let message = `*📍 Meu Roteiro Perambulando - ${displayDate}*\n\n`;
    items.forEach(item => {
      message += `🕒 *${item.time}* - ${item.title}\n_${item.details}_\n\n`;
    });
    message += `Monte o seu também em: ${window.location.origin}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  }

  function getItemsForDay(dateStr) {
    return (schedule[dateStr] || []).slice().sort((a, b) => a.time.localeCompare(b.time))
  }

  function addNote(e) {
    e.preventDefault()
    const newItem = {
      id: Date.now(),
      time: noteTime,
      title: noteTitle,
      details: 'Anotação Pessoal',
      type: 'note',
    }
    const updated = { ...schedule }
    if (!updated[selectedDate]) updated[selectedDate] = []
    updated[selectedDate] = [...updated[selectedDate], newItem]
    setSchedule(updated)
    localStorage.setItem('userSchedule', JSON.stringify(updated))
    setNoteTime('')
    setNoteTitle('')
  }

  function deleteItem(id) {
    const updated = { ...schedule }
    if (updated[selectedDate]) {
      updated[selectedDate] = updated[selectedDate].filter(item => item.id !== id)
      setSchedule(updated)
      localStorage.setItem('userSchedule', JSON.stringify(updated))
    }
  }

  const displayDate = new Date(`${selectedDate}T12:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long'
  })

  const items = getItemsForDay(selectedDate)

  if (!currentUser) return null

  return (
    <div>
      <Header />
      <main className="container">
        <div className="panel-header">
          <h2>Bem-vindo(a), {currentUser.nome || 'Viajante'}! 👋</h2>
          <p style={{ color: 'var(--secondary-color)', marginBottom: 20 }}>
            <i className="fas fa-envelope"></i> {currentUser.email}
          </p>
        </div>

        {/* JORNADA DO USUÁRIO - COMO FUNCIONA */}
        <section className="user-journey-container">
          <div className="journey-header">
            <h3><i className="fas fa-map-signs"></i> Como montar seu roteiro perfeito?</h3>
            <p>Siga os passos e perambule com organização pela cidade.</p>
          </div>
          <div className="journey-steps">
            <div className="journey-step">
              <div className="step-icon"><i className="fas fa-user-check"></i></div>
              <div className="step-text">
                <strong>1. Identifique-se</strong>
                <p>Faça login para salvar seus planos para sempre.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-icon"><i className="fas fa-calendar-plus"></i></div>
              <div className="step-text">
                <strong>2. Explore e Adicione</strong>
                <p>Navegue pelo site e clique em "Programar" nos eventos que curtir.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-icon"><i className="fas fa-edit"></i></div>
              <div className="step-text">
                <strong>3. Personalize</strong>
                <p>Adicione anotações (almoços, paradas) para completar seu dia.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-icon"><i className="fab fa-whatsapp"></i></div>
              <div className="step-text">
                <strong>4. Compartilhe</strong>
                <p>Gere uma imagem ou envie o roteiro de texto para seus amigos!</p>
              </div>
            </div>
          </div>
        </section>

        <div className="agenda-layout">
          <div className="agenda-controls">
            <h3 style={{ color: 'var(--primary-color)', marginBottom: 15 }}>Selecione o Dia</h3>
            <input
              type="date"
              className="filter-select"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{ width: '100%', marginBottom: 20 }}
            />

            <div className="add-note-form">
              <h4>Adicionar Anotação Pessoal</h4>
              <form onSubmit={addNote}>
                <input
                  type="time"
                  value={noteTime}
                  onChange={e => setNoteTime(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Ex: Jantar no Leite"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  required
                />
                <button type="submit">Adicionar</button>
              </form>
            </div>
          </div>

          <div className="agenda-list-container" ref={trilhaRef}>
            <div className="trilha-branding">
              <img src="/logo.png" alt="Logo" style={{ height: 30 }} />
              <span>perambulando.com.br</span>
            </div>
            <h3 className="itinerary-title">Roteiro para {displayDate}</h3>
            
            <div className="timeline-container">
              {items.length === 0 ? (
                <div className="empty-state">
                  <i className="far fa-calendar-times" style={{ fontSize: '3rem', display: 'block', marginBottom: '15px', color: '#ccc' }}></i>
                  Nenhuma programação para este dia.<br/>Adicione eventos ou anotações!
                </div>
              ) : (
                <div className="timeline">
                  {items.map((item, index) => (
                    <div key={item.id} className="timeline-item">
                      <div className="timeline-marker">
                        <div className="marker-dot"></div>
                        {index !== items.length - 1 && <div className="marker-line"></div>}
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-time">{item.time}</div>
                        <div className="timeline-card">
                          <div className="card-info">
                            <h4>{item.title}</h4>
                            <p>{item.details}</p>
                          </div>
                          <button
                            className="item-delete-btn"
                            onClick={() => deleteItem(item.id)}
                            title="Remover"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="trilha-footer-link">
              Monte seu roteiro em: <strong>{window.location.origin}</strong>
            </div>
          </div>
        </div>

        <div className="action-buttons-group" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
          <button onClick={exportAsImage} className="export-btn secondary">
            <i className="fas fa-camera"></i> Baixar como Imagem
          </button>
          <button onClick={shareToWhatsApp} className="export-btn whatsapp" style={{ background: '#25D366' }}>
            <i className="fab fa-whatsapp"></i> Compartilhar no WhatsApp
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
