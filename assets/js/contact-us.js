
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        const symbol = btn.querySelector(".symbol");

        if(content.style.maxHeight) {
            content.style.maxHeight = null;
            symbol.textContent = "+";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            symbol.textContent = "–";
        }
    });
});

document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {

        const item = header.parentElement;
        item.classList.toggle("active");
    });
});







