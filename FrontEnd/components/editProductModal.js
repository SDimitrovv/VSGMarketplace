import { editImage, editProduct, loadProduct } from "../src/itemsService.js";
import { closeModalHandler } from "../src/global.js";
import { imageHandler } from "../src/global.js";

export const editProductModal = async (id) => {
    const product = await loadProduct(id);
    const modal = document.createElement("form");
    modal.className = "editForm modalContent";
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
        <h2>Modify Item</h2>
        <input type="text" name="code" required placeholder="Code *" value="${product.code}">
        <input type="text" name="fullName" required placeholder="Name *" value="${product.fullName}">
        <textarea type="text" name="description" placeholder="Description">${product.description}</textarea>
        <select name="categoryId" class="category">
            <option value="" disabled>Category *</option>
            <option value="${product.categoryId}" selected>${product.type}</option>
        </select>
        <input type="number" name="quantityForSale" placeholder="Qty For Sale" value="${product.quantityForSale}">
        <input type="number" name="price" placeholder="Sale Price" value="${product.price}">
        <input type="number" name="quantity" required placeholder="Qty *" value="${product.quantity}">
    </div>
    <div class="rightModal">
        <img class="currentImg" src="${product.imageUrl}">
        <input class="inputImage" accept="image/*" name="picture" type="file">
        <div class="uploadDelete">
            <button class="uploadImg">Upload</button>
            <button class="deleteImg">Remove</button>
        </div>
    </div>
    </div>
    <button type="submit">Modify</button>
    `;

    const overlay = document.querySelector("#addItemOverlay2");
    overlay.appendChild(modal);
    closeModalHandler();
    imageHandler(modal);
    modal.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = formData.get("picture");
        formData.delete("picture");
        const imageForm = new FormData();
        imageForm.append("newPicture", image);

        const itemData = Object.fromEntries(formData);

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
            const res = await editProduct(id, itemData);
            console.log("PUT", res);
            const imgRes = await editImage(id, imageForm);
            console.log("Image PUT", imgRes)
        }

        modal.remove();
        overlay.style.display = "none";
    });
};
