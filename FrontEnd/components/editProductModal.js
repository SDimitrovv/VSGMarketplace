import { editProduct, loadCategories } from "../src/itemsService.js";
import { closeModalHandler } from "../src/global.js";
import { imageHandler } from "../src/global.js";
import { deleteImage, editImage } from "../src/pictureService.js";

export const editProductModal = async (product) => {
    if (!product.imageUrl) {
        product.imageUrl = '/images/inventory/no-image-placeholder.png';
    }

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
    closeModalHandler(modal);
    imageHandler(modal);

    const select = modal.querySelector('.category');
    const categories = await loadCategories();
    categories.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.type;
        if (product.type === c.type) {
            option.selected = 'selected';
        }

        select.appendChild(option);
    })

    modal.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = formData.get("picture");
        formData.delete("picture");
        const imageForm = new FormData();
        imageForm.append("newPicture", image);

        const currentImg = modal.querySelector('.currentImg').src;
        const itemData = Object.fromEntries(formData);

        if (image.name) {
            const imgRes = await editImage(product.id, imageForm);
            console.log("Image PUT", imgRes)
            product.imageUrl = imgRes;
        } else if (currentImg !== product.imageUrl) {
            const res = await deleteImage(product.id);
            product.imageUrl = '/images/inventory/no-image-placeholder.png';
            console.log("Image DELETE", res);
        }

        if (itemData.quantity < itemData.quantityForSale && quantity < 1) {
            return alert("Make sure that quantity is not less than quantity for sale!");
        } else {
            const res = await editProduct(product.id, itemData);
            product = res;
            console.log("PUT", res);
        }

        modal.remove();
        overlay.style.display = "none";
    });
};
