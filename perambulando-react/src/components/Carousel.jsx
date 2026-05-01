import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ events = [] }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const carouselEvents = events.filter((e) => e.image).slice(0, 5);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselEvents.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselEvents.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    if (carouselEvents.length === 0) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [carouselEvents.length]);

  if (carouselEvents.length === 0) return null;

  return (
    <div
      className="carousel-container-wrapper"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel-container">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselEvents.map((event, index) => (
            <div
              key={event.id}
              className={`carousel-item ${index === currentIndex ? "active" : ""}`}
              onClick={() => index === currentIndex && navigate(event.link)}
              style={{ cursor: index === currentIndex ? "pointer" : "default" }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="carousel-image"
              />
              <div className="carousel-caption">
                <h3>{event.title}</h3>
                <p>
                  {event.type} • {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control prev"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="carousel-control next"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="carousel-indicators">
        {carouselEvents.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
