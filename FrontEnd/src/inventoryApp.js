import { addButtons, closeContainerHandler, closeModal, closeModalHandler } from "./global.js";
import { addProduct } from "../components/addProductModal.js";
import { editProduct } from "../components/editProductModal.js";
import { loadProducts } from "./itemsService.js";
import { createRow } from "../components/createRow.js";

export const inventoryApp = async () => {
    const products = await loadProducts();
    products.forEach(p => {
        createRow(p.id, p.title, p.image, p.category, p.price);
    })

    const div = document.createElement('div');
    div.className = 'removeContainer';
    div.innerHTML = `
    <p>Are you sure you want to remove this item ?</p>
    <div class="buttons">
        <button class='yes'>Yes</button>
        <button class='no'>No</button> 
    </div>
    `;

    document.querySelector('#addButton').addEventListener('click', e => {
        e.preventDefault();
        addProduct();
        const overlay = document.querySelector('#addItemOverlay')
        overlay.style.display = 'flex';
        // closeModalHandler(overlay.firstElementChild);
        closeModal();
    });

    document.querySelectorAll('.delete').forEach(b => {
        b.addEventListener('click', (e) => {
            e.preventDefault();
            const el = e.target.parentElement;
            el.appendChild(div);
            addButtons();
            closeContainerHandler(div);
        });
    });

    // const categorySelect = document.querySelectorAll('.category');
    // categorySelect.forEach(c =>
    //     c.addEventListener('change', e => {
    //         if (e.target.value !== "") {
    //             c.style.color = '#000';
    //         }
    //     })
    // );

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

    // const deleteButtons = document.querySelectorAll('.deleteImg');
    // deleteButtons[0].addEventListener('click', e => {
    //     e.preventDefault();

    //     imagePreview[0].src = '/images/inventory/no-image-placeholder.png';
    // })

    // deleteButtons[1].addEventListener('click', e => {
    //     e.preventDefault();

    //     imagePreview[1].src = '/images/inventory/no-image-placeholder.png';
    // })

    document.querySelectorAll('.edit').forEach(b =>
        b.addEventListener('click', e => {
            e.preventDefault();
            const id = e.target.parentElement.parentElement.parentElement.id
            editProduct(id);
            // imagePreview[1].src = '/images/marketplace/product-image.png';
            const overlay = document.querySelector('#addItemOverlay2')
            overlay.style.display = 'flex';
            // closeModalHandler(overlay.firstElementChild);
            closeModal();
        })
    )
}
