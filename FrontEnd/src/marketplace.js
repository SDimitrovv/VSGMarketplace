import { addButtons } from "./global.js";

export function marketplace() {
    const div = document.createElement('div');
    div.className = 'container';
    div.innerHTML = `
    <p>Are you sure you want to buy <b>1</b> item for <b>5000 BGN</b> ?</p>
    <div class="buttons">
        <button class='yes'>Yes</button>
        <button class='no'>No</button>
    </div>
    `;

    document.querySelectorAll('.buyButton').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            const el = e.target.parentElement;
            el.appendChild(div);
            addButtons();
        })
    })

    document.querySelectorAll('.productButton').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector('#overlay').style.display = 'flex';
        })
    });
}