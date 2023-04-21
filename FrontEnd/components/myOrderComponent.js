import { closeContainerHandler } from "../src/global.js";
import { rejectOrder } from "../src/itemsService.js";

export const myOrderComponent = (id, quantity, date, status, fullName, price) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "pendingOrders";
    cardDiv.id = id;
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
            </div>
        </div>
    `;

    if (status === "Pending") {
        const popupParent = cardDiv.querySelector('#popupParent');
        const cancelOrderButton = document.createElement("a");
        cancelOrderButton.className = 'cancelOrder';
        cancelOrderButton.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.8203 1.35156L7.17188 6L11.8203 10.6484L10.6484 11.8203L6 7.17188L1.35156 11.8203L0.179688 10.6484L4.82812 6L0.179688 1.35156L1.35156 0.179688L6 4.82812L10.6484 0.179688L11.8203 1.35156Z"
                fill="#ED1C25" />
        </svg>
        `;

        cancelOrderButton.addEventListener("click", (e) => {
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

            div.querySelector('.yes').addEventListener('click', async e => {
                e.preventDefault();

                const res = await rejectOrder(id);
                console.log(res);
                cardDiv.querySelector('.orderStatus').textContent = "Decline";
                cancelOrderButton.remove();
            });

            closeContainerHandler(div);
            e.target.parentElement.appendChild(div);
        });

        popupParent.appendChild(cancelOrderButton);
    }

    const productsSections = document.querySelector("#myOrdersMain");
    productsSections.appendChild(cardDiv);
};
