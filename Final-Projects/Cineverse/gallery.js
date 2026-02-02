let currentImageIndex = 0;
const images = [
    'Citizen Kane.jpg',
    'Casablanca.jpg',
    'the third man.jpg',
    'Metropolis.jpg',
    'Nosferatu.jpg',
    'Psycho.jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = images[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function changeImage(direction, event) {
    event.stopPropagation();
    
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[currentImageIndex];
}

document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (event.key === 'Escape') {
            closeLightbox({ target: lightbox });
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1, event);
        } else if (event.key === 'ArrowRight') {
            changeImage(1, event);
        }
    }
});
