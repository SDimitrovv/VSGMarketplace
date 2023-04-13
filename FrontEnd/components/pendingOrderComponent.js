export const pendingOrderComponent = (id, code, quantityForSale) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = 'pendingOrders';
    cardDiv.id = id;
    cardDiv.innerHTML = `
    <div class="firstThree">
        <span class="codeColumn">${code}</span>
        <span class="qtyColumn">${quantityForSale}</span>
        <span class="priceColumn"></span>
    </div>
    <span class="orderedByColumn">smechkov@vsgbg.com</span>
    <span class="orderDateColumn">2023-03-13 16:30</span>
    <button class="actionColumn completeButton">Complete</button>
    `;

    const price = cardDiv.querySelector(".priceColumn");
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    price.textContent = randomNumber + " BGN";

    const productsSections = document.querySelector('#pendingOrdersMain');
    productsSections.appendChild(cardDiv);
};
