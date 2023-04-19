export const navStyling = (path) => {
    document.querySelectorAll(".navButton").forEach((n) => {
        const allPaths = n.textContent.trim().toLowerCase();
        if (path.includes("-")) {
            path = path.replace("-", " ");
        }

        if (allPaths === path) {
            n.className += " active";
            n.querySelector("path").style.fill = "#F0F0F0";
        } else {
            n.className = "navButton";
            n.querySelector("path").style.fill = "#ED1C25";
        }
    });
}

export const headerUpdate = (path) => {
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

    if (path === "/") {
        document.querySelector("#root").style.height = "100vh";
    } else {
        document.querySelector("#root").style.height = "calc(100vh - 60px)";
    }
}

export const closeModalHandler = () => {
    document
        .querySelectorAll(".closeModal")
        .forEach((b) => b.addEventListener("click", closing));
}

const closing = (e) => {
    e?.preventDefault();
    e.target.parentElement.remove();

    const overlay = document.querySelector("#addItemOverlay");
    const overlay2 = document.querySelector("#addItemOverlay2");
    overlay.style.display = "none";
    overlay2.style.display = "none";
}

export const closeContainerHandler = (container) => {
    container.querySelector("p").style.pointerEvents = "none";
    setTimeout(() => {
        document.addEventListener("click", closeContainerClick);
    }, "100");

    function closeContainerClick(e) {
        const isClickInsideContainer = container === e.target;
        if (!isClickInsideContainer) {
            container.remove();
            document.removeEventListener("click", closeContainerClick);
        }
    }
}

export const imageHandler = (modal) => {
    const imagePreview = document.querySelector(".currentImg");
    modal.querySelector(".uploadImg").addEventListener("click", e => {
        e.preventDefault();
        const input = modal.querySelector(".inputImage");
        input.addEventListener("change", () => {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = e => {
                imagePreview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        });

        input.click();
    })

    modal.querySelector(".deleteImg").addEventListener("click", (e) => {
        e.preventDefault();
        modal.querySelector(".currentImg").src =
            "/images/inventory/no-image-placeholder.png";
        modal.querySelector(".inputImage").value = "";
    })
};