import { closeModalHandler } from "../src/global.ts";
import { imageHandler } from "../src/global.ts";
import { createProduct, loadCategories } from "../src/itemsService.ts";
import { createImage } from "../src/pictureService.ts";
import { IProduct } from "../src/types.ts";
import { rowComponent } from "./rowComponent.ts";

export const addProduct = async (): Promise<void> => {
    const modal = document.createElement("form") as HTMLFormElement;
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
            </select>
            <input type="number" name="quantityForSale" placeholder="Qty For Sale">
            <input type="number" name="price" placeholder="Sale Price">
            <input type="number" name="quantity" required placeholder="Qty *">
        </div>
        <div class="rightModal">
            <img class="currentImg" src="/images/inventory/no-image-placeholder.png">
            <input id="uploadInput" class="inputImage" accept="image/*" name="picture" type="file">
            <div class="uploadDelete">
                <label for="uploadInput" class="uploadImg">Upload</label>
                <button class="deleteImg">Remove</button>
            </div>
        </div>
    </div>
    <button type="submit">Add</button>
    `;

    const overlay = document.querySelector("#addItemOverlay") as HTMLElement;
    overlay.appendChild(modal);

    const select = modal.querySelector('.category') as HTMLSelectElement;
    const categories = await loadCategories();
    categories.forEach(c => {
        const option = document.createElement('option') as HTMLOptionElement;
        option.value = `${c.id}`;
        option.textContent = c.type;
        select.appendChild(option);
    });

    modal.addEventListener("submit", async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const image = formData.get("picture") as File;
        formData.delete("picture");

        const imageForm = new FormData();
        imageForm.append("picture", image);
        const itemData = Object.fromEntries(formData) as unknown as IProduct;

        if (itemData.quantityForSale) {
            if (itemData.quantity < itemData.quantityForSale && itemData.quantity < 0) {
                return alert("Make sure that quantity is not less than quantity for sale!");
            }
        }

        const response = await createProduct(itemData);
        console.log("POST", response);
        if (image.name) {
            console.log(image);
            const imgRes = await createImage(response.id, imageForm) as string;
            console.log("Image POST", imgRes);
            response.imageUrl = imgRes;
        }

        rowComponent(response);

        modal.remove();
        overlay.style.display = "none";
    });

    closeModalHandler(modal);
    imageHandler(modal);
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 10);
};
