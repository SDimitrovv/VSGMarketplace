import { closeContainerHandler } from "../src/global.ts";
import { rejectOrder } from "../src/itemsService.ts";
import { IOrder } from "../src/types.ts";

export const myOrderComponent = (product: IOrder) => {
    const cardDiv = document.createElement("div") as HTMLElement;
    cardDiv.className = "pendingOrders";
    cardDiv.id = `${product.id}`;
    cardDiv.innerHTML = `
    <span class="nameColumn">${product.fullName}</span>
    <div class="firstTwo">
        <span class="qtyColumn">${product.quantity}</span>
        <span class="priceColumn">${product.price} BGN</span>
        </div>
        <span class="orderDateColumn">${product.date}</span>
        <div class="orderStatus">
            <span>${product.status}</span>
            <div id="popupParent">
            </div>
        </div>
    `;

    if (product.status === "Pending") {
        const popupParent = cardDiv.querySelector("#popupParent") as HTMLElement;
        const cancelOrderButton = document.createElement("a");
        cancelOrderButton.className = "cancelOrder";
        cancelOrderButton.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.8203 1.35156L7.17188 6L11.8203 10.6484L10.6484 11.8203L6 7.17188L1.35156 11.8203L0.179688 10.6484L4.82812 6L0.179688 1.35156L1.35156 0.179688L6 4.82812L10.6484 0.179688L11.8203 1.35156Z"
                fill="#ED1C25" />
        </svg>
        `;

        cancelOrderButton.addEventListener("click", (e: MouseEvent) => {
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

            (div.querySelector(".yes") as HTMLElement).addEventListener("click", async () => {
                const res = await rejectOrder(product.id);
                console.log(res);
                (cardDiv.querySelector(".orderStatus") as HTMLElement).textContent = "Declined";
                cancelOrderButton.remove();
            });

            closeContainerHandler(div);
            popupParent.appendChild(div);
            setTimeout(() => {
                div.style.opacity = '1';
            }, 10)
        });

        popupParent.appendChild(cancelOrderButton);
    }

    (document.querySelector("#myOrdersMain") as HTMLElement).appendChild(cardDiv);
    setTimeout(() => {
        cardDiv.style.opacity = "1";
    }, 300);
};
