import { addButtons, closeContainerHandler, closeModalHandler, } from "./global.js";
import { loadProducts } from "./itemsService.js";
import { cardComponent } from "../components/cardComponent.js";
import { createModal } from "../components/createModal.js";

export const marketplaceApp = async () => {
    const products = await loadProducts();
    products.forEach((p) => {
        cardComponent(p.id, p.image, p.category, p.price);
    });

    const createElement = (price) => {
        const div = document.createElement("div");
        div.className = "buyContainer";
        div.innerHTML = `
        <p>Are you sure you want to buy <b>1</b> item for <b>${price}</b> ?</p>
        <div class="buttons">
            <button type="submit" class='yes'>Yes</button>
            <button class='no'>No</button>
        </div>
        `;

        return div;
    };

    document.querySelectorAll(".buyButton").forEach((b) => {
        b.addEventListener("click", (e) => {
            e.preventDefault();
            const price = e.target.parentElement.parentElement.parentElement.querySelector(".price span").textContent;
            const div = createElement(price);
            e.target.parentElement.appendChild(div);
            addButtons();
            closeContainerHandler(div);
        });
    });

    document.querySelectorAll(".productButton").forEach((b) => {
        b.addEventListener("click", async (e) => {
            e.preventDefault();
            const id = e.target.parentElement.id;
            const modal = await createModal(id);
            document.querySelector("#overlay").style.display = "flex";
            modal.querySelector("#modalImage").style.pointerEvents = "none";
            modal.querySelector("#modalFrameOne").style.pointerEvents = "none";
            closeModalHandler();
        });
    });
};
