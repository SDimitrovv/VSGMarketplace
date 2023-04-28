import { editProduct, loadCategories } from "../src/itemsService.ts";
import { closeModalHandler, imagePlaceholder } from "../src/global.ts";
import { imageHandler } from "../src/global.ts";
import { deleteImage, editImage } from "../src/pictureService.ts";
import { ICategory, IProduct } from "../src/types.ts";

export const editProductModal = async (product: IProduct): Promise<void> => {
    if (!product.imageUrl) {
        product.imageUrl = imagePlaceholder;
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
        <input id="uploadInput" class="inputImage" accept="image/*" name="picture" type="file">
        <div class="uploadDelete">
            <label for="uploadInput" class="uploadImg">Upload</label>
            <button class="deleteImg">Remove</button>
        </div>
    </div>
    </div>
    <button type="submit">Modify</button>
    `;

    const overlay = document.querySelector("#overlay") as HTMLElement;
    overlay.appendChild(modal);
    closeModalHandler(modal);
    imageHandler(modal);

    const select = modal.querySelector('.category') as HTMLSelectElement;
    const categories = await loadCategories();
    categories.forEach((c: ICategory) => {
        const option = document.createElement('option') as HTMLOptionElement;
        option.value = `${c.id}`;
        option.textContent = c.type;
        if (product.type === c.type) {
            option.selected = true;
        }

        select.appendChild(option);
    })

    modal.addEventListener("submit", async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const image = formData.get("picture") as File;
        formData.delete("picture");
        const imageForm = new FormData();
        imageForm.append("newPicture", image);

        const currentImg = modal.querySelector('.currentImg') as HTMLImageElement;
        const itemData = Object.fromEntries(formData) as unknown as IProduct;

        if (itemData.quantityForSale) {
            if (itemData.quantity < itemData.quantityForSale || itemData.quantity < 0) {
                return alert("Make sure that quantity is not less than quantity for sale!");
            }
        }

        if (image.name) {
            const imgRes = await editImage(product.id as number, imageForm);
            console.log("Image PUT", imgRes)
            product.imageUrl = imgRes as string;
        } else if (currentImg.src !== product.imageUrl) {
            const res = await deleteImage(product.id as number);
            product.imageUrl = imagePlaceholder;
            console.log("Image DELETE", res);
        }

        const res = await editProduct(product.id as number, itemData);
        console.log("PUT", res);

        modal.remove();

        overlay.style.display = "none";
    });

    setTimeout(() => {
        modal.style.opacity = "1";
    }, 10);
};
