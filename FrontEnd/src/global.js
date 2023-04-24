import { createOrder } from "./itemsService";
import { navigateTo } from "./router";

export const imagePlaceholder = '/images/inventory/no-image-placeholder.png'

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
    const root = document.querySelector("#root");

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
        root.style.height = "100vh";
    } else {
        root.style.height = "calc(100vh - 60px)";
    }
}

export const closeModalHandler = (modal) => {
    const overlay = modal.parentElement;
    overlay.addEventListener('mousedown', e => {
        if (e.target === overlay) {
            closing();
        }
    }, true);

    modal.querySelector(".closeModal").addEventListener("click", closing, true);

    function closing() {
        modal.remove();
        overlay.style.display = "none";
    }
}

export const closeContainerHandler = (container) => {
    const yes = container.querySelector("yes");
    container.querySelector("p").style.pointerEvents = "none";
    document.addEventListener("click", closeContainerClick, true);

    async function closeContainerClick(e) {
        if (yes !== e.target && container !== e.target) {
            container.remove();
            document.removeEventListener("click", closeContainerClick);
        }
    }
}

export const imageHandler = (modal) => {
    const imagePreview = document.querySelector(".currentImg");
    const input = modal.querySelector(".inputImage");

    modal.querySelector(".uploadImg").addEventListener("click", e => {
        e.preventDefault();
        input.addEventListener("change", () => {
            const reader = new FileReader();
            const file = input.files[0];

            reader.onload = e => {
                imagePreview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        });

        input.click();
    });

    modal.querySelector(".deleteImg").addEventListener("click", (e) => {
        e.preventDefault();
        imagePreview.src = imagePlaceholder;
        input.value = "";
    })
};