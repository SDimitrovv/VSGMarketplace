import { navbar } from "../components/navbar.js";
import { myOrdersApp } from "../src/myOrdersApp.js";

const MyOrders = () => {
    document.querySelector('#root').innerHTML = `
    ${navbar}
    <main id="myOrdersMain">
    <div id="headingSection">
        <span class="nameColumn">Name</span>
        <span class="qtyColumn">QTY</span>
        <span class="priceColumn">Price</span>
        <span class="orderDateColumn">Order Date</span>
        <span>Status</span>
    </div>
    </main>
    `;
    myOrdersApp();
};

export default MyOrders;
