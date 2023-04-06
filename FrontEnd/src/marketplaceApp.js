import { addButtons, closeContainerHandler, closeModalHandler, closeModal } from "./global.js";

export const marketplaceApp = () => {
    closeModal();

    const div = document.createElement('div');
    div.className = 'buyContainer';
    div.innerHTML = `
    <p>Are you sure you want to buy <b>1</b> item for <b>5000 BGN</b> ?</p>
    <div class="buttons">
        <button type="submit" class='yes'>Yes</button>
        <button class='no'>No</button>
    </div>
    `;

    document.querySelectorAll('.buyButton').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            e.target.parentElement.appendChild(div);
            addButtons();
            closeContainerHandler(div);
        })
    })

    document.querySelectorAll('.productButton').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#overlay').style.display = 'flex';
            document.querySelector('#modalImage').style.pointerEvents = 'none';
            document.querySelector('#modalFrameOne').style.pointerEvents = 'none';
            const modal = document.querySelector('#modalContent');
            closeModalHandler(modal);
        })
    });
}