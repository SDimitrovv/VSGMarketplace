import { myOrdersApp } from "../src/myOrdersApp.js";

const MyOrders = () => {
    const main = document.querySelector('main');
    main.id = "myOrdersMain";
    main.innerHTML =  `
    <div id="headingSection">
        <span class="nameColumn">Name</span>
        <span class="qtyColumn">QTY</span>
        <span class="priceColumn">Price</span>
        <span class="orderDateColumn">Order Date</span>
        <span>Status</span>
    </div>
    `;
    myOrdersApp();
};

export default MyOrders;
