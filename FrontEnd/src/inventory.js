import { addButtons } from "./marketplace.js";

export function inventory() {
    const div = document.createElement('div');
    div.className = 'container';
    div.innerHTML = `
    <p>Are you sure you want to remove this item ?</p>
    <div class="buttons">
        <button class='yes'>Yes</button>
        <button class='no'>No</button>
    </div>
    `;

    document.querySelectorAll('.delete').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target.parentElement);
            e.target.parentElement.parentElement.appendChild(div);
            addButtons();
        })
    })
}