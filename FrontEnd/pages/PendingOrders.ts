import { pendingOrderComponent } from "../components/pendingOrderComponent.ts";
import { loadPendingOrders } from "../src/itemsService.ts";
import { IOrder } from "../src/types.ts";

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

    const orders = await loadPendingOrders();
    orders.forEach((p: IOrder) => {
        pendingOrderComponent(p);
    });
};

export default PendingOrders;
