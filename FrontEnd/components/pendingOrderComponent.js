import { completeOrder } from "../src/itemsService";

export const pendingOrderComponent = (id, code, quantity, price, email, date) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = 'pendingOrders';
    cardDiv.id = id;
    cardDiv.innerHTML = `
    <div class="firstThree">
        <span class="codeColumn">${code}</span>
        <span class="qtyColumn">${quantity}</span>
        <span class="priceColumn">${price} BGN</span>
    </div>
    <span class="orderedByColumn">${email}</span>
    <span class="orderDateColumn">${date.substring(0, 16)}</span>
    <button class="actionColumn completeButton">Complete</button>
    `;


    cardDiv.querySelector('.completeButton').addEventListener('click', async e => {
        e.preventDefault();

        const res = await completeOrder(id);
        console.log(res);
        e.target.parentElement.remove();
    })


    const productsSections = document.querySelector('#pendingOrdersMain');
    productsSections.appendChild(cardDiv);
};
