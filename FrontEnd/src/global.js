export function navStyling(path) {
    document.querySelectorAll(".navButton").forEach((n) => {
        const allPaths = n.textContent.trim().toLowerCase();

        if (path.includes("-")) {
            path = path.replace("-", " ");
        }

        if (allPaths === path) {
            n.className += " active";
            n.querySelector("path").style.fill = "#F0F0F0";
        }
    });
}

export function headerUpdate(path) {
    const titleElement = document.querySelector("#pageTitle");

    if (path.includes("-")) {
        let [name1, name2] = path.split("-");
        name1 = name1.replace(name1[0], name1[0].toUpperCase());
        name2 = name2.replace(name2[0], name2[0].toUpperCase());
        titleElement.textContent = name1 + " " + name2;
    } else {
        const pageTitle = path.replace(path[0], path[0].toUpperCase());
        titleElement.textContent = pageTitle;
    }
}

export function addButtons() {
    document.querySelectorAll(".buttons button").forEach((b) => {
        b.addEventListener("click", (e) => {
            e.preventDefault();
            e.target.parentElement.parentElement.remove();
        });
    });
}

export function closeModal() {
    document.querySelectorAll(".closeModal").forEach((b) =>
        b.addEventListener("click", (e) => {
            e.preventDefault();
            let overlay = document.querySelector("#overlay");
            if (!overlay) {
                overlay = document.querySelector("#addItemOverlay");
                const overlay2 = document.querySelector("#addItemOverlay2");
                overlay2.style.display = "none";
            }

            overlay.style.display = "none";
        })
    );
}
