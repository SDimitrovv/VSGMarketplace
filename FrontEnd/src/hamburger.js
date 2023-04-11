export const hamburgerHandler = () => {
    const hamburger = document.querySelector("#hamburger");
    const closeMenu = document.querySelector("#closeMenu");
    const main = document.querySelector("main");
    const aside = document.querySelector("aside");

    hamburger.addEventListener("click", () => {
        hamburger.style.display = "none";
        aside.style.display = "flex";
        main.style.display = "none";
        closeMenu.style.display = "block";
    });

    closeMenu.addEventListener("click", () => {
        closeMenu.style.display = "none";
        main.style.display = "flex";
        aside.style.display = "none";
        hamburger.style.display = "block";
    });

    window.addEventListener('resize', () => {   
        if (window.innerWidth < 769) {
            hamburger.style.display = "block";
            aside.style.display = "none";
        }

        if (window.innerWidth > 768) {
            closeMenu.style.display = "none";
            hamburger.style.display = "none";
            main.style.display = "flex";
            aside.style.display = "flex";
        }
    })

    if (window.innerWidth < 769) {
        hamburger.style.display = "block";
        aside.style.display = "none";
    }

    if (window.innerWidth > 768) {
        closeMenu.style.display = "none";
        hamburger.style.display = "none";
        main.style.display = "flex";
        aside.style.display = "flex";
    }
};
