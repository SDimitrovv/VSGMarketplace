export const pendingOrderComponent = (id, price) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = 'pendingOrders';
    cardDiv.id = id;
    cardDiv.innerHTML = `
    <div class="firstThree">
        <span class="codeColumn">${id}</span>
        <span class="qtyColumn"></span>
        <span class="priceColumn">${price} BGN</span>
    </div>
    <span class="orderedByColumn">smechkov@vsgbg.com</span>
    <span class="orderDateColumn">2023-03-13 16:30</span>
    <button class="actionColumn completeButton">Complete</button>
    `;

    const qtyColumn = cardDiv.querySelector(".qtyColumn");
    const randomNumber = Math.floor(Math.random() * 11) + 1;

    for (let i = 1; i <= randomNumber; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        if (i === 1) {
            option.selected = true;
        }

        qtyColumn.textContent = randomNumber;
    }

    const productsSections = document.querySelector('#pendingOrdersMain');
    productsSections.appendChild(cardDiv);
};
