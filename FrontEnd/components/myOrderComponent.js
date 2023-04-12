export const myOrderComponent = (id, title, price) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = 'pendingOrders';
    cardDiv.id = id;
    cardDiv.innerHTML = `
    <span class="nameColumn">${title}</span>
    <div class="firstTwo">
        <span class="qtyColumn"></span>
        <span class="priceColumn">${price} BGN</span>
        </div>
        <span class="orderDateColumn">2023-03-13 16:30</span>
        <div class="orderStatus">
            <span>Pending</span>
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

    const productsSections = document.querySelector('#myOrdersMain');
    productsSections.appendChild(cardDiv);
};
