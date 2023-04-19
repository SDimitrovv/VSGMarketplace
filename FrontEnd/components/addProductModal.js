import { closeModalHandler } from "../src/global.js";
import { imageHandler } from "../src/global.js";
import { createImage, createProduct } from "../src/itemsService.js";
import { createRow } from "./createRow.js";

export const addProduct = () => {
    const modal = document.createElement("form");
    modal.className = "addForm modalContent";
    modal.innerHTML = `
    <a class="closeModal">
        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.7305 1.75977L10.7578 8.5L17.7305 15.2402L15.9727 16.9395L9 10.1992L2.02734 16.9395L0.269531 15.2402L7.24219 8.5L0.269531 1.75977L2.02734 0.0605469L9 6.80078L15.9727 0.0605469L17.7305 1.75977Z"
                fill="black" />
        </svg>
    </a>
    <div class="row">
        <div class="leftModal">
            <h2>Add New Item</h2>
            <input type="text" name="code" placeholder="Code *" required>
            <input type="text" name="fullName" placeholder="Name *" required>
            <textarea type="text" name="description" placeholder="Description"></textarea>
            <select name="categoryId" class="category">
                <option value="" disabled selected>Category *</option>
                <option value="1">Laptops</option>
            </select>
            <input type="number" name="quantityForSale" placeholder="Qty For Sale">
            <input type="number" name="price" placeholder="Sale Price">
            <input type="number" name="quantity" required placeholder="Qty *">
        </div>
        <div class="rightModal">
            <img class="currentImg" src="/images/inventory/no-image-placeholder.png">
            <input class="inputImage" accept="image/*" name="picture" type="file">
            <div class="uploadDelete">
                <button class="uploadImg">Upload</button>
                <button class="deleteImg">Remove</button>
            </div>
        </div>
    </div>
    <button type="submit">Add</button>
    `;

    const overlay = document.querySelector("#addItemOverlay");
    overlay.appendChild(modal);
    closeModalHandler();
    imageHandler(modal);

    modal.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = formData.get("picture");
        formData.delete("picture");
        const imageForm = new FormData();
        imageForm.append("picture", image);

        let itemData = Object.fromEntries(formData);
        console.log(itemData);
        console.log(image);

        // const user = JSON.parse(localStorage.getItem('user'));
        // if (!user) {
        //     alert("You are not logged in!");
        //     return;
        // }

        if (!image.name) {
            return alert("Choose an image!");
        } else if (itemData.quantity < itemData.quantityForSale) {
            return alert("Make sure that quantity is not less than quantity for sale!");
        } else {
            const res = await createProduct(itemData);
            const id = await res.json();
            itemData.id = id;
            itemData.type = "Laptop";
            console.log("POST", id);
            const imgRes = await createImage(id, imageForm);
            console.log("Image POST", imgRes);
        }

        modal.remove();
        overlay.style.display = "none";

        createRow(
            itemData.id,
            itemData.code,
            itemData.fullName,
            itemData.type,
            itemData.quantityForSale,
            itemData.quantity
        );
    });
};
