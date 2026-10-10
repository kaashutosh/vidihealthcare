// Mobile menu open/close
document.getElementById("mobileMenuBtn").onclick = () => {
    document.getElementById("mobileNav").classList.toggle("hidden");
};

// Mobile diabetes open/close
document.getElementById("diabetesBtn").onclick = () => {
    document.getElementById("diabetesMenu").classList.toggle("hidden");
};

// Desktop smooth menu fix
let desktopTimer = null;

function openDesktopMenu() {
    clearTimeout(desktopTimer);
    document.getElementById("desktopDiabetesMenu").classList.remove("hidden");
}

function closeDesktopMenu() {
    desktopTimer = setTimeout(() => {
        document.getElementById("desktopDiabetesMenu").classList.add("hidden");
    }, 200);
}

/*  first swiper  */
var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay:{
    delay:2500,
    disableOnInteraction:false,
  }
});

    const modal = document.getElementById('videoModal');
    const popupVideo = document.getElementById('popupVideo');

    function openPopup(src) {
        popupVideo.src = src;
        modal.style.display = "flex";
        popupVideo.play();
    }

    function closePopup() {
        modal.style.display = "none";
        popupVideo.pause();
        popupVideo.src = "";
    }

    // Close on background click
    window.onclick = function(e) {
        if (e.target == modal) closePopup();
    }



    //     stats section

    function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const isDecimal = stat.getAttribute('data-decimal');
        let count = 0;
        const speed = 200;

        const update = () => {
            if (count < target) {
                count += isDecimal ? 0.1 : Math.ceil(target / speed);
                if (count > target) count = target;

                stat.innerText = isDecimal ? count.toFixed(1) : count.toLocaleString();
                requestAnimationFrame(update);
            }
        };
        update();
    });
}

// Trigger only once on scroll
let started = false;
const section = document.getElementById('stats');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
        started = true;
        animateNumbers();
    }
}, { threshold: 0.4 });

observer.observe(section);

        