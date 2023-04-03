import { addButtons } from "./global.js";

function marketplaceApp() {
    const div = document.createElement('div');
    div.className = 'buyContainer';
    div.innerHTML = `
    <p>Are you sure you want to buy <b>1</b> item for <b>5000 BGN</b> ?</p>
    <div class="buttons">
        <button type="submit" class='yes'>Yes</button>
        <button class='no'>No</button>
    </div>
    `;

    console.log(document.querySelectorAll('.buyButton'));

    document.querySelectorAll('.buyButton').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            e.target.parentElement.appendChild(div);
            addButtons();
        })
    })

    document.querySelectorAll('.productButton').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#overlay').style.display = 'flex';
        })
    });

    console.log('linked');
}

marketplaceApp()