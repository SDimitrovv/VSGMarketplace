import { myOrderComponent } from "../components/myOrderComponent.js";
import { loadMyOrders } from "../src/itemsService.ts";

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

    (document.querySelector("#headingSection") as HTMLElement).style.opacity = '1'

    const orders = await loadMyOrders(email);
    for (let i = 0; i < orders.length; i++) {
        setTimeout(() => {
            myOrderComponent(orders[i]);
        }, i * 50);
    }
};

export default MyOrders;
