import { navbar } from "../components/navbar.js";

const Inventory = () => {
    setPageScripts(['src/inventoryApp.js']);

    return `
    ${navbar}
    <main id="inventoryMain">
    <div id="searchSpace">
        <div id="input">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.55176 7.17578C5.28092 7.17578 5.90072 6.92057 6.41113 6.41016C6.92155 5.89974 7.17676 5.27995 7.17676 4.55078C7.17676 3.82161 6.92155 3.20182 6.41113 2.69141C5.90072 2.18099 5.28092 1.92578 4.55176 1.92578C3.82259 1.92578 3.2028 2.18099 2.69238 2.69141C2.18197 3.20182 1.92676 3.82161 1.92676 4.55078C1.92676 5.27995 2.18197 5.89974 2.69238 6.41016C3.2028 6.92057 3.82259 7.17578 4.55176 7.17578ZM8.05176 7.17578L10.9502 10.0742L10.0752 10.9492L7.17676 8.05078V7.58594L7.0127 7.42188C6.31999 8.02344 5.49967 8.32422 4.55176 8.32422C3.49447 8.32422 2.59668 7.95964 1.8584 7.23047C1.12012 6.5013 0.750977 5.60807 0.750977 4.55078C0.750977 3.49349 1.12012 2.5957 1.8584 1.85742C2.59668 1.11914 3.49447 0.75 4.55176 0.75C5.60905 0.75 6.50228 1.11914 7.23145 1.85742C7.96061 2.5957 8.32519 3.49349 8.32519 4.55078C8.32519 4.93359 8.23405 5.36654 8.05176 5.84961C7.86947 6.33268 7.65983 6.72005 7.42285 7.01172L7.58691 7.17578H8.05176Z"
                    fill="black" />
            </svg>
            <input type="text" placeholder="Search..." />
        </div>
        <button id="addButton">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="7.5" x2="15" y2="7.5" stroke="white" />
                <line x1="7.5" x2="7.5" y2="15" stroke="white" />
            </svg>
            Add new
        </button>
    </div>
    <div id="tableBorder">
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>For Sale</th>
                    <th>QTY</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Laptop Macbook Pro 16” M1 Max</td>
                    <td>Laptops</td>
                    <td>0</td>
                    <td>2</td>
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
                </tr>
                <tr>
                    <td>2</td>
                    <td>Monitor Dell 27'</td>
                    <td>Monitors</td>
                    <td>2</td>
                    <td>22</td>
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
                </tr>
                <tr>
                    <td>3</td>
                    <td>Gaming Chair RedDragon</td>
                    <td>Chairs</td>
                    <td>5</td>
                    <td>30</td>
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
                </tr>
            </tbody>
        </table>
    </div>
</main>
</div>
<div id="addItemOverlay">
<form class="modalContent">
    <button class="closeModal">
        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.7305 1.75977L10.7578 8.5L17.7305 15.2402L15.9727 16.9395L9 10.1992L2.02734 16.9395L0.269531 15.2402L7.24219 8.5L0.269531 1.75977L2.02734 0.0605469L9 6.80078L15.9727 0.0605469L17.7305 1.75977Z"
                fill="black" />
        </svg>
    </button>
    <div class="row">
        <div class="leftModal">
            <h2>Add New Item</h2>
            <input type="number" required placeholder="Code *">
            <input type="text" required placeholder="Name *">
            <textarea type="text" placeholder="Description"></textarea>
            <select class="category">
                <option value="" disabled selected>Category *</option>
                <option value="laptops">Laptops</option>
            </select>
            <input type="number" placeholder="Qty For Sale">
            <input type="number" required placeholder="Qty *">
        </div>
        <div class="rightModal">
            <img class="currentImg" src="/images/inventory/no-image-placeholder.png">
            <div class="uploadDelete">
                <button class="uploadImg">Upload</button>
                <button class="deleteImg">Remove</button>
            </div>
        </div>
    </div>
    <button type="submit">Add</button>
</form>
</div>
<div id="addItemOverlay2">
<form class="modalContent">
    <button class="closeModal">
        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.7305 1.75977L10.7578 8.5L17.7305 15.2402L15.9727 16.9395L9 10.1992L2.02734 16.9395L0.269531 15.2402L7.24219 8.5L0.269531 1.75977L2.02734 0.0605469L9 6.80078L15.9727 0.0605469L17.7305 1.75977Z"
                fill="black" />
        </svg>
    </button>
    <div class="row">
        <div class="leftModal">
            <h2>Modify Item</h2>
            <input type="number" required placeholder="Code *" value="1">
            <input type="text" required placeholder="Name *" value="Apple MacBook Pro 16” M1 Max 32GB">
            <textarea type="text" placeholder="Description">This is the description of the product. This is the description of the product.
This is the description of the product.
This is the description of the product.
            </textarea>
            <select class="category">
                <option value="" disabled>Category *</option>
                <option value="laptops" selected>Laptops</option>
            </select>
            <input type="number" placeholder="Qty For Sale" value="0">
            <input type="number" required placeholder="Qty *" value="2">
        </div>
        <div class="rightModal">
        <img class="currentImg" src="images/marketplace/product-image.png">
            <div class="uploadDelete">
                <button class="uploadImg">Upload</button>
                <button class="deleteImg">Remove</button>
            </div>
        </div>
    </div>
    <button type="submit">Modify</button>
</form>
</div>
`;
}

export default Inventory;