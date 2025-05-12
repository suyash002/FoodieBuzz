import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderImages = [
    'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/23ade834ac1dfb5adc195c6f977540dcb2dcc1ca-2100x1050.png?w=1350&q=75&fit=max&auto=format',
    'https://www.tastingtable.com/img/gallery/the-mozzarella-cheese-mistake-youre-probably-making-with-pizza/intro-1681497423.jpg',
    'https://plus.unsplash.com/premium_photo-1664472619078-9db415ebef44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzdGF8ZW58MHwwfDB8fHww',
  ];

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 3 to 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000); // Random interval between 3 to 5 seconds

    // Clear the interval on component unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider">
        <button className="prev-btn" onClick={prevSlide}>
          &#10094;
        </button>
        <img
          src={sliderImages[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="slider-image"
        />
        <button className="next-btn" onClick={nextSlide}>
          &#10095;
        </button>
        <div className="dots">
          {sliderImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
