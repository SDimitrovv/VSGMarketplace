import { addButtons } from "./global.js";

document.querySelectorAll(".cancelOrder").forEach((b) => {
    b.addEventListener("click", (e) => {
        e.preventDefault();
        const div = document.createElement("div");
        div.className = "cancelOrderContainer";
        div.innerHTML = `
    <p>Are you sure you want to reject this order ?</p>
    <div class="buttons">
    <button type="submit" class='yes'>Yes</button>
    <button class='no'>No</button>
    </div>
    `;
        e.target.parentElement.appendChild(div);
        addButtons();
    });
});