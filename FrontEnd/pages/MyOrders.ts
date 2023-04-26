import { myOrderComponent } from "../components/myOrderComponent.js";
import { loadMyOrders } from "../src/itemsService.ts";
import { IOrder } from "../src/types.ts";

const MyOrders = async (): Promise<void> => {
    const main = document.querySelector("main") as HTMLElement;
    main.id = "myOrdersMain";
    main.innerHTML = `
    <div id="headingSection">
        <span class="nameColumn">Name</span>
        <span class="qtyColumn">QTY</span>
        <span class="priceColumn">Price</span>
        <span class="orderDateColumn">Order Date</span>
        <span class="orderStatus">Status</span>
    </div>
    `;

    const user: string | null = sessionStorage.getItem("user");
    const email: string = user ? JSON.parse(user).username : "eredzhepov@vsgbg.com";

    const orders = await loadMyOrders(email);
    orders.forEach((p: IOrder) => {
        myOrderComponent(p);
    });
};

export default MyOrders;
