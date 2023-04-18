import { pendingOrderComponent } from "../components/pendingOrderComponent.js";
import { loadInventory } from "./itemsService.js";

export const pendingOrdersApp = async () => {
    const pendingProducts = await loadInventory();
    pendingProducts.forEach((p) => {
        pendingOrderComponent(p.id, p.code, p.quantityForSale);
    });

    document.querySelectorAll('.completeButton').forEach(b => {
        b.addEventListener('click', e => {
            e.target.parentElement.remove();
        })
    })
}