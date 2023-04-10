import { makeRequest } from "../src/makeRequest.js";
import { loadProduct } from "../src/itemsService.js";
import { closeModalHandler } from "../src/global.js";
import { imageHandler } from "../src/inventoryApp.js";

export const editProduct = async (id) => {
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
        <input type="number" name="code" required placeholder="Code *" value="${product.id}">
        <input type="text" name="name" required placeholder="Name *" value="${product.title}">
        <textarea type="text" name="description" placeholder="Description">${product.description}</textarea>
        <select name="category" class="category">
            <option value="" disabled>Category *</option>
            <option value="${product.category}" selected>${product.category}</option>
        </select>
        <input type="number" name="qtyForSale" placeholder="Qty For Sale" value="0">
        <input type="number" name="price" placeholder="Sale Price" value="${product.price}">
        <input type="number" name="qty" required placeholder="Qty *" value="2">
    </div>
    <div class="rightModal">
        <img class="currentImg" name="image" src="${product.image}">
        <input class="inputImage" accept="image/*" name="image"  type="file">
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
    imageHandler();
    modal.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = formData.get("image");
        if (image.name) {
            const res = await makeRequest({
                path: "/products/" + id,
                method: "PUT",
                image,
            });

            console.log("IMAGE PUT", res);
        }

        formData.delete("image");
        const itemData = Object.fromEntries(formData);
        console.log(itemData);

        // const user = JSON.parse(localStorage.getItem('user'));
        // if (!user) {
        //     alert("You are not logged in!");
        //     return;
        // }

        const res = await makeRequest({
            path: "/products/" + id,
            method: "PUT",
            itemData,
        });

        console.log("PUT", res);
        modal.remove();
        overlay.style.display = "none";
    });
};
