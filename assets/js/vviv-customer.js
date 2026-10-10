const track = document.querySelector('.vvip-track');
const cards = document.querySelectorAll('.vvip-card');
const dotsContainer = document.querySelector('.dots');

let index = 0;

// Create dots based on card count
cards.forEach((_, i) => {
    const span = document.createElement('span');
    if(i === 0) span.classList.add('active');
    span.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(span);
});

const dots = document.querySelectorAll('.dots span');

function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

function nextSlide() {
    index = (index + 1) % cards.length;
    updateSlider();
}
function prevSlide() {
    index = (index - 1 + cards.length) % cards.length;
    updateSlider();
}

document.querySelector('.next').onclick = nextSlide;
document.querySelector('.prev').onclick = prevSlide;

// Auto scroll every 4 seconds
setInterval(nextSlide, 4000);

function goToSlide(i) {
    index = i;
    updateSlider();
}
