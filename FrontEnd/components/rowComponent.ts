import { closeContainerHandler } from "../src/global";
import { deleteProduct } from "../src/itemsService";
import { IProduct } from "../src/types";
import { editProductModal } from "./editProductModal.ts";

export const rowComponent = (product: IProduct) => {
    const row = document.createElement("tr");
    row.id = `${product.id}`;
    row.className = 'productRow';
    row.innerHTML = `
    <td>${product.code}</td>
    <td>${product.fullName}</td>
    <td>${product.type}</td>
    <td>${product.quantityForSale}</td>
    <td>${product.quantity}</td>
    <td>
        <div class="editDelete">
            <a class="edit">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.8125 2.6875L10.5938 3.90625L8.09375 1.40625L9.3125 0.1875C9.4375 0.0625 9.59375 0 9.78125 0C9.96875 0 10.125 0.0625 10.25 0.1875L11.8125 1.75C11.9375 1.875 12 2.03125 12 2.21875C12 2.40625 11.9375 2.5625 11.8125 2.6875ZM0 9.5L7.375 2.125L9.875 4.625L2.5 12H0V9.5Z"
                        fill="#ED6C02" />
                </svg>
            </a>
            <a class="delete">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.34375 0.65625H9.65625V2H0.34375V0.65625H2.65625L3.34375 0H6.65625L7.34375 0.65625ZM2.34375 4V10.6562H7.65625V4H2.34375ZM1 10.6562V2.65625H9V10.6562C9 11.0104 8.86458 11.3229 8.59375 11.5938C8.32292 11.8646 8.01042 12 7.65625 12H2.34375C1.98958 12 1.67708 11.8646 1.40625 11.5938C1.13542 11.3229 1 11.0104 1 10.6562Z"
                        fill="#ED1C25" />
                </svg>
            </a>
        </div>
    </td>
    `;

    (row.querySelector(".edit") as HTMLElement).addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        editProductModal(product);
        const overlay = document.querySelector("#addItemOverlay2") as HTMLElement;
        overlay.style.display = "flex";
        setTimeout(() => {
            overlay.style.opacity = "1";
        }, 10);
    });

    (row.querySelector(".delete") as HTMLElement).addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        const div = document.createElement("div");
        div.className = "removeContainer";
        div.innerHTML = `
            <p>Are you sure you want to remove this item ?</p>
            <div class="buttons">
                <button class='yes'>Yes</button>
                <button class='no'>No</button> 
            </div>
        `;

        (div.querySelector('.yes') as HTMLElement).addEventListener('click', async (e: MouseEvent) => {
            e.preventDefault();
            const res = await deleteProduct(product.id);
            console.log(res);
            row.remove();
        });

        closeContainerHandler(div);
        const target = e.target as HTMLElement;
        const parentTarget = target.parentElement as HTMLElement;
        parentTarget.appendChild(div);
        setTimeout(() => {
            div.style.opacity = '1';
        }, 10)
    });

    (document.querySelector('tbody') as HTMLElement).appendChild(row);
    setTimeout(() => {
        row.style.opacity = "1";
    }, 300);
};
