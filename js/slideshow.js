document.addEventListener('DOMContentLoaded', () => {
  // Slideshow functionality
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slide-prev');
  const nextBtn = document.querySelector('.slide-next');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0) {
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 4000);
    }

    function stopSlideshow() {
      clearInterval(slideInterval);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { stopSlideshow(); nextSlide(); startSlideshow(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopSlideshow(); prevSlide(); startSlideshow(); });

    showSlide(0);
    startSlideshow();

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
      slideshowContainer.addEventListener('mouseenter', stopSlideshow);
      slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }
  }

  // Carousel for cards
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselPrev = document.querySelector('.carousel-prev');
  const carouselNext = document.querySelector('.carousel-next');

  if (carouselTrack && carouselPrev && carouselNext) {
    const cards = carouselTrack.querySelectorAll('.card');
    let cardIndex = 0;
    const cardsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth + 25;
      carouselTrack.style.transform = `translateX(-${cardIndex * cardWidth}px)`;
    }

    carouselNext.addEventListener('click', () => {
      if (cardIndex < cards.length - cardsPerView) {
        cardIndex++;
        updateCarousel();
      }
    });

    carouselPrev.addEventListener('click', () => {
      if (cardIndex > 0) {
        cardIndex--;
        updateCarousel();
      }
    });

    window.addEventListener('resize', () => {
      const newCardsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
      if (newCardsPerView !== cardsPerView) {
        cardIndex = Math.min(cardIndex, cards.length - newCardsPerView);
        updateCarousel();
      }
    });
  }
});
