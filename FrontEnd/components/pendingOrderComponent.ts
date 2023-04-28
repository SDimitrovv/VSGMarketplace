import { completeOrder } from "../src/itemsService";
import { IOrder } from "../src/types";

export const pendingOrderComponent = (product: IOrder) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "pendingOrders";
    cardDiv.id = `${product.id}`;
    cardDiv.innerHTML = `
    <div class="firstThree">
        <span class="codeColumn">${product.code}</span>
        <span class="qtyColumn">${product.quantity}</span>
        <span class="priceColumn">${product.price} BGN</span>
    </div>
    <span class="orderedByColumn">${product.email}</span>
    <span class="orderDateColumn">${product.date}</span>
    <button class="actionColumn completeButton">Complete</button>
    `;

    (cardDiv.querySelector(".completeButton") as HTMLElement).addEventListener(
        "click",
        async (e) => {
            e.preventDefault();
            const res = await completeOrder(product.id);
            console.log(res);
            const parentElement = (e.target as HTMLElement).parentElement as HTMLElement;
            parentElement.style.opacity = "0";
            setTimeout(() => {
                parentElement.remove();
            }, 500);
        }
    );

    (document.querySelector("#pendingOrdersMain") as HTMLElement).appendChild(cardDiv);
    setTimeout(() => {
        cardDiv.style.opacity = "1";
        (document.querySelector("#headingSection") as HTMLElement).style.opacity = '1'
    }, 300);
};
