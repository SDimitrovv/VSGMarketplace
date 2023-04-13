
import { myOrderComponent } from "../components/myOrderComponent.js";
import { addButtons, closeContainerHandler } from "./global.js";
import { loadProducts } from "./itemsService.js";

export const myOrdersApp = async () => {
    const myProducts = await loadProducts();
    myProducts.forEach((p) => {
        myOrderComponent(p.id, p.fullName, p.quantityForSale);
    });

    document.querySelectorAll(".cancelOrder").forEach((b) => {
        b.addEventListener("click", (e) => {
            e.preventDefault();
            const div = document.createElement("div");
            div.className = "cancelOrderContainer";
            div.innerHTML = `
                <p>Are you sure you want to reject this order ?</p>
                <div class="buttons">
                <button type="submit" class='yes'>Yes</button>
                <button class='no'>No</button>
                </div>
                `;
            e.target.parentElement.appendChild(div);
            addButtons();
            closeContainerHandler(div);
        });
    });
}