document.getElementById("mobileMenuBtn").onclick = () => {
            document.getElementById("mobileNav").classList.toggle("hidden");
        };

        const diabetesBtn = document.getElementById("diabetesBtn");
        const diabetesMenu = document.getElementById("diabetesMenu");
        if (diabetesBtn && diabetesMenu) {
            diabetesBtn.onclick = () => {
                diabetesMenu.classList.toggle("hidden");
            };
        }

        let desktopTimer = null;

        function openDesktopMenu() {
            const desktopDiabetesMenu = document.getElementById("desktopDiabetesMenu");
            if (!desktopDiabetesMenu) return;
            clearTimeout(desktopTimer);
            desktopDiabetesMenu.classList.remove("hidden");
        }

        function closeDesktopMenu() {
            const desktopDiabetesMenu = document.getElementById("desktopDiabetesMenu");
            if (!desktopDiabetesMenu) return;
            desktopTimer = setTimeout(() => {
                desktopDiabetesMenu.classList.add("hidden");
            }, 200);
        }