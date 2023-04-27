import { pendingOrderComponent } from "../components/pendingOrderComponent.ts";
import { loadPendingOrders } from "../src/itemsService.ts";

const PendingOrders = async (): Promise<void> => {
    const main = document.querySelector('main') as HTMLElement;
    main.id = "pendingOrdersMain";
    main.innerHTML = `
    <div id="headingSection">
        <span class="codeColumn">Code</span>
        <span class="qtyColumn">QTY</span>
        <span class="priceColumn">Price</span>
        <span class="orderedByColumn">Ordered By</span>
        <span class="orderDateColumn">Order Date</span>
        <span class="actionColumn">Action</span>
    </div>
    `;

    (document.querySelector("#headingSection") as HTMLElement).style.opacity = '1'

    const orders = await loadPendingOrders();
    for (let i = 0; i < orders.length; i++) {
        setTimeout(() => {
            pendingOrderComponent(orders[i]);
        }, i * 50);
    }
};

export default PendingOrders;
