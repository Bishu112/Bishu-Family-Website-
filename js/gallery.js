document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  let currentImageIndex = 0;
  let visibleImages = [];

  // Get visible images based on filter
  function getVisibleImages() {
    return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
  }

  // Open lightbox
  if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        visibleImages = getVisibleImages();
        currentImageIndex = visibleImages.indexOf(item);
        if (currentImageIndex === -1) currentImageIndex = 0;
        openLightbox();
      });
    });
  }

  function openLightbox() {
    if (lightbox && visibleImages[currentImageIndex]) {
      const img = visibleImages[currentImageIndex].querySelector('img');
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function showPrev() {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    const img = visibleImages[currentImageIndex].querySelector('img');
    lightboxImg.src = img.src;
  }

  function showNext() {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    const img = visibleImages[currentImageIndex].querySelector('img');
    lightboxImg.src = img.src;
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Click outside to close
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
});
