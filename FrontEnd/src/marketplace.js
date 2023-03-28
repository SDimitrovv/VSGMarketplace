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

    document.querySelectorAll('.productButton').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector('#overlay').style.display = 'flex';
        })
    });

    document.querySelectorAll('.buyButton').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();

            e.target.parentElement.parentElement.appendChild(div);
            addButtons();
        })
    })

    document.querySelector('#closeModal')?.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('#overlay').style.display = 'none';
    })
}

export function addButtons() {
    document.querySelectorAll('.buttons button').forEach(b => {
        b.addEventListener('click', e => {
            e.preventDefault();
            const container = e.target.parentElement.parentElement;
            container.remove();
        })
    })
}