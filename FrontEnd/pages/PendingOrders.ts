import { pendingOrderComponent } from "../components/pendingOrderComponent.js";
import { loadPendingOrders } from "../src/itemsService.js";

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

    type Order = {
        id: number;
        code: String;
        quantity: number;
        price: number;
        email: string
        date: string;
        status: string;
    };
    const orders: Order[] = await loadPendingOrders();
    orders.forEach((p: Order) => {
        pendingOrderComponent(p);
    });
};

export default PendingOrders;
