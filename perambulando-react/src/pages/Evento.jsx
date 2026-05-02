import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { feirasData, mockEventsData } from "../data/data";

export default function Evento() {
  // Todos os hooks no topo
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [showNearbyModal, setShowNearbyModal] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      const cleanId = String(id)
        .replace("event-", "")
        .replace("mock-", "")
        .replace("feira-", "");

      // 1. Tenta buscar no banco de dados (API)
      try {
        const response = await fetch(`http://localhost:3001/api/eventos`);
        if (response.ok) {
          const data = await response.json();
          const found = data.find((e) => String(e.id) === cleanId);
          if (found) {
            setEvent({ ...found, type: "api" });
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.warn("API offline ou erro ao buscar evento:", error);
      }

      // 2. Tenta buscar no mockEventsData
      const mockFound = mockEventsData.find((e) => String(e.id) === cleanId);
      if (mockFound) {
        setEvent({ ...mockFound, type: "mock" });
        setLoading(false);
        return;
      }

      // 3. Tenta buscar nas feiras
      const feiraFound = feirasData.find((f) => String(f.id) === cleanId);
      if (feiraFound) {
        setEvent({
          id: `feira-${feiraFound.id}`,
          title: feiraFound.name,
          category: "Rua",
          date: new Date(),
          location: feiraFound.address,
          description: `Feira de ${feiraFound.type} na zona ${feiraFound.zone}. Funcionamento: ${feiraFound.days}. Horário: ${feiraFound.time}`,
          image:
            feiraFound.image ||
            "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800",
          price: "Gratuito",
          type: "feira",
          days: feiraFound.days,
          time: feiraFound.time,
        });
        setLoading(false);
        return;
      }

      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <>
        <Header />
        <div
          className="container"
          style={{ padding: "100px", textAlign: "center" }}
        >
          <i
            className="fas fa-spinner fa-spin"
            style={{
              fontSize: "2rem",
              color: "var(--primary)",
              marginBottom: "20px",
            }}
          ></i>
          <p>Carregando detalhes do percurso...</p>
        </div>
        <Footer />
      </>
    );

  if (!event) {
    return (
      <div>
        <Header />
        <main className="container">
          <div className="empty-state" style={{ padding: "100px 20px" }}>
            <i
              className="fas fa-search-minus"
              style={{ fontSize: "3rem", marginBottom: "20px", opacity: 0.3 }}
            ></i>
            <h2>Evento não encontrado</h2>
            <p>
              Não conseguimos localizar o evento solicitado. Ele pode ter sido
              removido ou o link está incorreto.
            </p>
            <Link
              to="/"
              className="btn-primary"
              style={{ marginTop: "30px", display: "inline-flex" }}
            >
              Voltar para a Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const dateObj =
    event.date instanceof Date ? event.date : new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function addToSchedule() {
    const dateKey = dateObj.toISOString().split("T")[0];
    const timeToSave =
      event.type === "feira" ? event.time || "08:00" : formattedTime;
    const newItem = {
      id: Date.now(),
      time: timeToSave,
      title: event.title,
      details: event.location,
      type: "event",
    };
    const schedule = JSON.parse(localStorage.getItem("userSchedule")) || {};
    if (!schedule[dateKey]) schedule[dateKey] = [];
    schedule[dateKey].push(newItem);
    localStorage.setItem("userSchedule", JSON.stringify(schedule));
    alert(`"${event.title}" adicionado à sua programação!`);
  }

  async function fetchNearby() {
    setLoadingNearby(true);
    setShowNearbyModal(true);
    try {
      const cleanId = String(event.id)
        .replace("event-", "")
        .replace("mock-", "")
        .replace("feira-", "");
      const response = await fetch(
        `http://localhost:3001/api/eventos/${cleanId}/proximidades`,
      );
      if (response.ok) {
        const data = await response.json();

        // Adicionar notas e preços aleatórios se não existirem
        const enhancedRestaurants = data.restaurantes.map((r) => ({
          ...r,
          rating: r.rating || Math.floor(Math.random() * 5) + 1, // 1 a 5
          price: r.price_level || Math.floor(Math.random() * 5) + 1, // 1 a 5
        }));

        setNearbyRestaurants(enhancedRestaurants);
      } else {
        // Fallback para quando o evento não está no banco (mock) ou erro na API
        setNearbyRestaurants([]);
      }
    } catch (error) {
      console.error("Erro ao buscar proximidades:", error);
      setNearbyRestaurants([]);
    } finally {
      setLoadingNearby(false);
    }
  }

  function renderStars(rating) {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <i
          key={i}
          className={`${i < rating ? "fas" : "far"} fa-star`}
          style={{ color: "#f59e0b", fontSize: "0.8rem" }}
        ></i>
      ));
  }

  function renderPrice(price) {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          style={{
            color: i < price ? "var(--primary)" : "#ccc",
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          $
        </span>
      ));
  }

  return (
    <div>
      <Header />
      <main className="container">
        {/* Modal de Proximidades */}
        {showNearbyModal && (
          <div
            className="modal-overlay active"
            onClick={() => setShowNearbyModal(false)}
          >
            <div
              className="modal active"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "600px" }}
            >
              <div className="modal-header">
                <h2>O que há por perto de {event.title}</h2>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowNearbyModal(false)}
                >
                  &times;
                </button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                {loadingNearby ? (
                  <div style={{ textAlign: "center", padding: "40px" }}>
                    <i
                      className="fas fa-spinner fa-spin"
                      style={{ fontSize: "2rem", color: "var(--primary)" }}
                    ></i>
                    <p style={{ marginTop: "10px" }}>
                      Buscando estabelecimentos...
                    </p>
                  </div>
                ) : nearbyRestaurants.length > 0 ? (
                  <div className="nearby-list">
                    {nearbyRestaurants.map((res) => (
                      <div
                        key={res.id}
                        className="nearby-item"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "15px 0",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: 0, color: "var(--dark)" }}>
                            {res.name}
                          </h4>
                          <p
                            style={{
                              margin: "4px 0",
                              fontSize: "0.85rem",
                              color: "var(--text-light)",
                            }}
                          >
                            <i
                              className="fas fa-utensils"
                              style={{ marginRight: "6px" }}
                            ></i>{" "}
                            {res.cuisine}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "0.8rem",
                              color: "var(--muted)",
                            }}
                          >
                            <i
                              className="fas fa-map-marker-alt"
                              style={{ marginRight: "6px" }}
                            ></i>{" "}
                            {res.address}
                          </p>
                        </div>
                        <div style={{ textAlign: "right", minWidth: "100px" }}>
                          <div
                            className="rating-stars"
                            style={{ marginBottom: "5px" }}
                          >
                            {renderStars(res.rating)}
                          </div>
                          <div className="price-indicator">
                            {renderPrice(res.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "var(--muted)",
                    }}
                  >
                    <i
                      className="fas fa-map-marked-alt"
                      style={{
                        fontSize: "3rem",
                        marginBottom: "15px",
                        opacity: 0.3,
                      }}
                    ></i>
                    <p>Não encontramos restaurantes próximos a este local.</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn-primary"
                  onClick={() => setShowNearbyModal(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="event-detail-content">
          <div className="event-hero">
            <img
              src={event.image}
              alt={event.title}
              className="event-hero-img"
            />
            <div className="event-hero-overlay">
              <span className="category">{event.category || "Evento"}</span>
              <h1
                style={{
                  fontSize: "2.5rem",
                  marginTop: "15px",
                  color: "var(--accent-orange)",
                }}
              >
                {event.title}
              </h1>
            </div>
          </div>

          <div className="event-detail-info-container">
            <div className="event-description">
              <h2>Sobre o Evento</h2>
              <p>
                {event.description || "Nenhuma descrição detalhada disponível."}
              </p>

              {event.type === "feira" && (
                <div
                  style={{
                    marginTop: "30px",
                    padding: "20px",
                    background: "var(--bg-paper)",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3 style={{ marginBottom: "15px" }}>
                    Informações de Funcionamento
                  </h3>
                  <p>
                    <strong>
                      <i className="far fa-calendar-alt"></i> Dias:
                    </strong>{" "}
                    {event.days}
                  </p>
                  <p>
                    <strong>
                      <i className="far fa-clock"></i> Horário:
                    </strong>{" "}
                    {event.time}
                  </p>
                </div>
              )}
            </div>

            <div className="event-sidebar">
              <div className="event-meta-card">
                <div className="event-meta-item">
                  <i className="far fa-calendar-alt"></i>
                  <span>
                    {event.type === "feira" ? "Recorrente" : formattedDate}
                  </span>
                </div>
                {event.type !== "feira" && (
                  <div className="event-meta-item">
                    <i className="far fa-clock"></i>
                    <span>{formattedTime}</span>
                  </div>
                )}
                <div className="event-meta-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.location}</span>
                </div>
                <div className="event-meta-item">
                  <i className="fas fa-tag"></i>
                  <span>{event.price || "Gratuito"}</span>
                </div>
              </div>

              <div className="event-detail-actions">
                <button
                  className="btn-submit btn-add-schedule"
                  onClick={addToSchedule}
                >
                  <i className="far fa-calendar-plus"></i> Adicionar à
                  Programação
                </button>
                <button
                  className="btn-submit"
                  onClick={fetchNearby}
                  style={{ background: "var(--secondary)", marginTop: "5px" }}
                >
                  <i className="fas fa-map-marked-alt"></i> O que há por perto
                </button>
                {event.ticketLink && (
                  <a
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ticket"
                  >
                    <i className="fas fa-ticket-alt"></i> Comprar Ingresso
                  </a>
                )}
                {event.instagramLink && (
                  <a
                    href={event.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-instagram"
                  >
                    <i className="fas fa-external-link-alt"></i> Ver Site
                    Oficial
                  </a>
                )}
                <Link
                  to="/"
                  className="back-link"
                  style={{ marginTop: "10px" }}
                >
                  ← Voltar para a Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
