import { closeContainerHandler } from "../src/global";

export const myOrderComponent = (quantity, date, status, fullName, price) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "pendingOrders";
    cardDiv.innerHTML = `
    <span class="nameColumn">${fullName}</span>
    <div class="firstTwo">
        <span class="qtyColumn">${quantity}</span>
        <span class="priceColumn">${price} BGN</span>
        </div>
        <span class="orderDateColumn">${date.substring(0, 10)}</span>
        <div class="orderStatus">
            <span>${status}</span>
            <div id="popupParent">
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
    `;

    cardDiv.querySelector(".cancelOrder").addEventListener("click", (e) => {
        e.preventDefault();
        const div = document.createElement("div");
        div.className = "cancelOrderContainer";
        div.innerHTML = `
                <p>Are you sure you want to reject this order ?</p>
                <div class="buttons">
                <button type="submit" class='yes'>Yes</button>
                <button class='no'>No</button>
                </div>
                `;
        e.target.parentElement.appendChild(div);
        closeContainerHandler(div);
    });

    const productsSections = document.querySelector("#myOrdersMain");
    productsSections.appendChild(cardDiv);
};
