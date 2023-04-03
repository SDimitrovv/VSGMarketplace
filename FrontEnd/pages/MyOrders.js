import { navbar } from "../components/navbar.js";


const MyOrders = () => {
    return `
    ${navbar}
    <main id="myOrdersMain">
    <div id="headingSection">
        <span class="nameColumn">Name</span>
        <span class="qtyColumn">QTY</span>
        <span class="priceColumn">Price</span>
        <span class="orderDateColumn">Order Date</span>
        <span>Status</span>
    </div>
    <div class="pendingOrders">
        <span class="nameColumn">MacBook Pro 16” M1 Max 32GB 1TB</span>
        <span class="qtyColumn">1</span>
        <span class="priceColumn">5000 BGN</span>
        <span class="orderDateColumn">2023-03-13 16:30</span>
        <div class="orderStatus">
            <span>Pending</span>
            <div>
                <a class="cancelOrder">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.8203 1.35156L7.17188 6L11.8203 10.6484L10.6484 11.8203L6 7.17188L1.35156 11.8203L0.179688 10.6484L4.82812 6L0.179688 1.35156L1.35156 0.179688L6 4.82812L10.6484 0.179688L11.8203 1.35156Z"
                            fill="#ED1C25" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
    <div class="pendingOrders">
        <span class="nameColumn">Gaming Chair RedDragon</span>
        <span class="qtyColumn">10</span>
        <span class="priceColumn">900 BGN</span>
        <span class="orderDateColumn">2023-03-13 12:30</span>
        <span>Finished</span>
    </div>
    <div class="pendingOrders">
        <span class="nameColumn">Monitor Dell 27” IPS + Stand</span>
        <span class="qtyColumn">3</span>
        <span class="priceColumn">750 BGN</span>
        <span class="orderDateColumn">2023-03-13 20:30</span>
        <div class="orderStatus">
            <span>Pending</span>
            <div>
                <a class="cancelOrder">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.8203 1.35156L7.17188 6L11.8203 10.6484L10.6484 11.8203L6 7.17188L1.35156 11.8203L0.179688 10.6484L4.82812 6L0.179688 1.35156L1.35156 0.179688L6 4.82812L10.6484 0.179688L11.8203 1.35156Z"
                            fill="#ED1C25" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</main>
<script src="src/orders.js"></script>
`;
};

export default MyOrders;
