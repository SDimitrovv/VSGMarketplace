import { pendingOrdersApp } from "../src/pendingOrdersApp.js";

const PendingOrders = () => {
    const main = document.querySelector('main');
    main.id = "pendingOrdersMain";
    main.innerHTML =  `
    <div id="headingSection">
        <span class="codeColumn">Code</span>
        <span class="qtyColumn">QTY</span>
        <span class="priceColumn">Price</span>
        <span class="orderedByColumn">Ordered By</span>
        <span class="orderDateColumn">Order Date</span>
        <span class="actionColumn">Action</span>
    </div>
`;

    pendingOrdersApp();
};

export default PendingOrders;
