import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockEventsData } from '../data/data';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Usar os primeiros 5 eventos para o carrossel
  const carouselEvents = mockEventsData.slice(0, 5);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselEvents.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      <div 
        className="carousel-inner" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselEvents.map((event) => (
          <div key={event.id} className="carousel-item">
            <img src={event.image} alt={event.title} className="carousel-image" />
            <div className="carousel-caption">
              <h3>{event.title}</h3>
              <p>{event.category} • {event.location}</p>
              <Link to={`/evento/${event.id}`} className="carousel-btn">Ver Detalhes</Link>
            </div>
          </div>
        ))}
      </div>
      
      <button className="carousel-control prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-control next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="carousel-indicators">
        {carouselEvents.map((_, index) => (
          <span 
            key={index} 
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
