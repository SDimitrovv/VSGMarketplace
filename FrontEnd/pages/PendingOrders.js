import { navbar } from "../components/navbar.js";

const PendingOrders = () => {
    return `
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
    <div class="pendingOrders">
        <div class="firstThree">
            <span class="codeColumn">1</span>
            <span class="qtyColumn">1</span>
            <span class="priceColumn">5000 BGN</span>
        </div>
        <span class="orderedByColumn">smechkov@vsgbg.com</span>
        <span class="orderDateColumn">2023-03-13 16:30</span>
        <button class="actionColumn completeButton">Complete</button>
    </div>
    <div class="pendingOrders">
        <div class="firstThree">
            <span class="codeColumn">2</span>
            <span class="qtyColumn">10</span>
            <span class="priceColumn">900 BGN</span>
        </div>
        <span class="orderedByColumn">smechkov@vsgbg.com</span>
        <span class="orderDateColumn">2023-03-13 12:30</span>
        <button class="actionColumn completeButton">Complete</button>
    </div>
    <div class="pendingOrders">
        <div class="firstThree">
            <span class="codeColumn">3</span>
            <span class="qtyColumn">3</span>
            <span class="priceColumn">750 BGN</span>
        </div>
        <span class="orderedByColumn">smechkov@vsgbg.com</span>
        <span class="orderDateColumn">2023-03-13 20:30</span>
        <button class="actionColumn completeButton">Complete</button>
    </div>
</main>
`;
};

export default PendingOrders;
