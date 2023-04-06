import { makeRequest } from "../src/makeRequest.js";

export const addProduct = () => {
    const modal = document.createElement('form');
    modal.className = 'modalContent';
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
            <input type="number" name="code" placeholder="Code *" required>
            <input type="text" name="name" placeholder="Name *" required>
            <textarea type="text" name="description" placeholder="Description"></textarea>
            <select name="category" class="category">
                <option value="" disabled selected>Category *</option>
                <option value="laptops">Laptops</option>
            </select>
            <input type="number" name="qtyForSale" placeholder="Qty For Sale">
            <input type="number" name="price" placeholder="Sale Price">
            <input type="number" name="qty" required placeholder="Qty *">
        </div>
        <div class="rightModal">
            <img class="currentImg" name="image" src="images/inventory/no-image-placeholder.png">
            <div class="uploadDelete">
                <button class="uploadImg">Upload</button>
                <button class="deleteImg">Remove</button>
            </div>
        </div>
    </div>
    <button type="submit">Add</button>
`;
    const overlay = document.querySelector('#addItemOverlay')
    overlay.appendChild(modal);

    document.querySelector('.modalContent').addEventListener('submit', async e => {
        e.preventDefault();

        const itemData = Object.fromEntries(new FormData(e.target));

        // const user = JSON.parse(localStorage.getItem('user'));
        // if (!user) {
        //     alert("You are not logged in!");
        //     return;
        // }

        console.log(itemData);
        const res = await makeRequest({
            path: "/products",
            method: "POST",
            itemData
        });

        console.log(res);

        overlay.style.display = 'none';
    });
}
