import { navbar } from "../components/navbar.js";
import { inventoryApp } from "../src/inventoryApp.js";

const Inventory = () => {
    document.querySelector('#root').innerHTML = `
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
            </tbody>
        </table>
    </div>
</main>
</div>
<div id="addItemOverlay">
</div>
<div id="addItemOverlay2">
</div>
`;
    inventoryApp();
    // setPageScripts(['src/inventoryApp.js']);
}

export default Inventory;