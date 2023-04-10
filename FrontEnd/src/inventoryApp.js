import { addButtons, closeContainerHandler } from "./global.js";
import { addProduct } from "../components/addProductModal.js";
import { editProduct } from "../components/editProductModal.js";
import { loadProducts } from "./itemsService.js";
import { createRow } from "../components/createRow.js";

export const inventoryApp = async () => {
    const products = await loadProducts();
    products.forEach((p) => {
        createRow(p.id, p.title, p.category);
    });

    const div = document.createElement("div");
    div.className = "removeContainer";
    div.innerHTML = `
    <p>Are you sure you want to remove this item ?</p>
    <div class="buttons">
        <button class='yes'>Yes</button>
        <button class='no'>No</button> 
    </div>
    `;

    document.querySelector("#addButton").addEventListener("click", (e) => {
        e.preventDefault();
        addProduct();
        const overlay = document.querySelector("#addItemOverlay");
        overlay.style.display = "flex";
    });

    document.querySelectorAll(".edit").forEach((b) =>
        b.addEventListener("click", (e) => {
            e.preventDefault();
            const id = e.target.parentElement.parentElement.parentElement.id;
            editProduct(id);
            const overlay = document.querySelector("#addItemOverlay2");
            overlay.style.display = "flex";
        })
    );

    document.querySelectorAll(".delete").forEach((b) => {
        b.addEventListener("click", (e) => {
            e.preventDefault();
            const el = e.target.parentElement;
            el.appendChild(div);
            addButtons();
            closeContainerHandler(div);
            imageHandler();
        });
    });
};

export const imageHandler = () => {
    const imagePreview = document.querySelectorAll(".currentImg");
    document.querySelectorAll(".uploadImg").forEach((b) =>
        b.addEventListener("click", (e) => {
            e.preventDefault();
            const input = document.querySelector(".inputImage");
            input.addEventListener("change", () => {
                const file = input.files[0];
                const reader = new FileReader();

                reader.onload = function (e) {
                    imagePreview.forEach((i) => {
                        i.src = e.target.result;
                    });
                };

                reader.readAsDataURL(file);
            });

            input.click();
        })
    );

    document.querySelectorAll(".deleteImg").forEach((b) =>
        b.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(".currentImg").src = "/images/inventory/no-image-placeholder.png";
            document.querySelector(".inputImage").value = "";
        })
    );
};
