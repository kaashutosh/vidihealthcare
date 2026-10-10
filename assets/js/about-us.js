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