import { navbar } from "../components/navbar.js";
import { pendingOrdersApp } from "../src/pendingOrdersApp.js";

const PendingOrders = () => {
    document.querySelector('#root').innerHTML = `
    ${navbar}
<main id="pendingOrdersMain">
    <div id="headingSection">
        <span class="codeColumn">Code</span>
        <span class="qtyColumn">QTY</span>
        <span class="priceColumn">Price</span>
        <span class="orderedByColumn">Ordered By</span>
        <span class="orderDateColumn">Order Date</span>
        <span class="actionColumn">Action</span>
    </div>
</main>
`;

    pendingOrdersApp();
};

export default PendingOrders;
