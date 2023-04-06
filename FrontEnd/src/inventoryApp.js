import { addButtons, closeContainerHandler, closeModal, closeModalHandler } from "./global.js";

export const inventoryApp = () => {
    closeModal();
    const div = document.createElement('div');
    div.className = 'removeContainer';
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
            const el = e.target.parentElement;
            el.appendChild(div);
            addButtons();
            closeContainerHandler(div);
        });
    });

    document.querySelector('#addButton').addEventListener('click', e => {
        e.preventDefault();
        const overlay = document.querySelector('#addItemOverlay')
        overlay.style.display = 'flex';
        closeModalHandler(overlay.firstElementChild);
    });

    const categorySelect = document.querySelectorAll('.category');
    categorySelect.forEach(c =>
        c.addEventListener('change', e => {
            if (e.target.value !== "") {
                c.style.color = '#000';
            }
        })
    );

    const imagePreview = document.querySelectorAll('.currentImg');
    document.querySelectorAll('.uploadImg').forEach(b =>
        b.addEventListener('click', e => {
            e.preventDefault();

            const input = document.createElement('input');
            input.type = 'file';

            input.addEventListener('change', () => {
                const file = input.files[0];
                const reader = new FileReader();

                reader.onload = function (event) {
                    imagePreview.forEach(i => {
                        i.src = event.target.result;
                    });
                };

                reader.readAsDataURL(file);
            });

            input.click();
        })
    );

    const deleteButtons = document.querySelectorAll('.deleteImg');
    deleteButtons[0].addEventListener('click', e => {
        e.preventDefault();

        imagePreview[0].src = '/images/inventory/no-image-placeholder.png';
    })

    deleteButtons[1].addEventListener('click', e => {
        e.preventDefault();

        imagePreview[1].src = '/images/inventory/no-image-placeholder.png';
    })

    document.querySelectorAll('.edit').forEach(b =>
        b.addEventListener('click', e => {
            e.preventDefault();
            imagePreview[1].src = '/images/marketplace/product-image.png';
            const overlay = document.querySelector('#addItemOverlay2')
            overlay.style.display = 'flex';
            closeModalHandler(overlay.firstElementChild);
        })
    )
}
