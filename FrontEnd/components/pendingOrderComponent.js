import { completeOrder } from "../src/itemsService";

export const pendingOrderComponent = (product) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = 'pendingOrders';
    cardDiv.id = product.id;
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

    cardDiv.querySelector('.completeButton').addEventListener('click', async e => {
        e.preventDefault();

        const res = await completeOrder(product.id);
        console.log(res);
        e.target.parentElement.remove();
    })

    const productsSections = document.querySelector('#pendingOrdersMain');
    productsSections.appendChild(cardDiv);
};
