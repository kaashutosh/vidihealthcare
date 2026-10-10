
const slider = document.getElementById("slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function getCardsPerView() {
    return window.innerWidth <= 768 ? 2 : 4;
}

next.addEventListener("click", () => {
    const cards = getCardsPerView();
    index += cards;
    if (index >= slider.children.length) index = 0;
    slider.style.transform = `translateX(-${index * (100 / cards)}%)`;
});

prev.addEventListener("click", () => {
    const cards = getCardsPerView();
    index -= cards;
    if (index < 0) index = slider.children.length - cards;
    slider.style.transform = `translateX(-${index * (100 / cards)}%)`;
});

