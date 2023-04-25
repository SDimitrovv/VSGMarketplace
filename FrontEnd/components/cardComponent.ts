import { closeContainerHandler, closeModalHandler } from "../src/global.ts";
import { createOrder } from "../src/itemsService.ts";
import { navigateTo } from "../src/router.ts";
import { productModal } from "./productModal.ts";
import { MarketplaceProduct } from "../src/types.ts";

export const cardComponent = (product: MarketplaceProduct) => {
    if (!product.imageUrl) {
        product.imageUrl = '/images/inventory/no-image-placeholder.png';
    }

    const cardDiv = document.createElement("div") as HTMLDivElement;
    cardDiv.className = "product";
    cardDiv.id = `${product.id}`;
    cardDiv.innerHTML = `
   <a class='productButton'>
       <img src="${product.imageUrl}" alt="Product-image">
   </a>
   <div class="productContent">
       <div class="price">
           <span>${product.price} BGN</span>
           <small>${product.type}</small>
       </div>
       <div class="quantityAndImg">
           <form>
               <div class="quantity">
                   <span>Qty</span>
                   <select class="randomNumberSelect">
                   </select>
               </div>
               <div id="popupParent">
               <button class="buyButton">
                   <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <circle cx="15.5" cy="15.5" r="15.5" fill="#ED1C25" />
                       <g clip-path="url(#clip0_9_220)">
                           <path
                               d="M24.6709 11.9547L19.0459 6.32971C18.7669 6.05071 18.3625 5.93877 17.9794 6.03327C17.7775 6.08277 17.5969 6.18683 17.454 6.32971C17.3263 6.45739 17.2302 6.61546 17.175 6.79208C16.9202 7.61839 16.4798 8.33671 15.8278 8.98808C14.9571 9.85827 13.8231 10.5175 12.6233 11.2145C11.3498 11.9525 10.0341 12.7175 8.95578 13.7952C8.03946 14.7126 7.41565 15.733 7.05002 16.9176C6.92684 17.3176 7.03427 17.7501 7.32902 18.046L12.954 23.671C13.233 23.95 13.6375 24.062 14.0205 23.9675C14.2225 23.9168 14.403 23.8139 14.5459 23.671C14.6736 23.5433 14.7698 23.3853 14.8249 23.2075C15.0803 22.3812 15.5207 21.6629 16.1732 21.0115C17.0434 20.1413 18.1768 19.4832 19.3778 18.7868C20.6502 18.0477 21.9664 17.2827 23.0442 16.205C23.9605 15.2886 24.5843 14.2671 24.9505 13.0825C25.0731 12.6831 24.9651 12.2489 24.6709 11.9547ZM13.75 22.8751C11.887 21.0121 9.98796 19.1125 8.12496 17.2501C9.72359 12.0745 16.6525 12.3006 18.25 7.12508C20.113 8.98752 22.0125 10.8871 23.8761 12.7501C22.2769 17.9245 15.348 17.6995 13.75 22.8751ZM18.0036 14.3813C17.8202 14.2278 17.6357 14.1231 17.4501 14.0714C17.2656 14.0196 17.0811 13.9988 16.8943 14.0123C16.7098 14.0264 16.5208 14.0686 16.3318 14.1411C16.1428 14.2148 15.9527 14.2947 15.7615 14.3875C15.4594 14.0405 15.1573 13.6973 14.8553 13.379C14.9914 13.2558 15.1236 13.1933 15.2507 13.1888C15.3784 13.1832 15.501 13.1967 15.6175 13.226C15.7362 13.2558 15.8447 13.2811 15.9448 13.3008C16.0461 13.3205 16.1338 13.2985 16.2109 13.2338C16.2925 13.1635 16.3375 13.0724 16.3437 12.9627C16.3493 12.8519 16.3077 12.7439 16.2148 12.6387C16.0962 12.5026 15.9533 12.4199 15.7817 12.3895C15.6124 12.3597 15.4392 12.362 15.2586 12.4013C15.0808 12.4418 14.9115 12.5088 14.7512 12.6033C14.5909 12.6978 14.4621 12.7945 14.3665 12.889C14.3299 12.8541 14.2933 12.8198 14.2568 12.7855C14.2163 12.7484 14.1657 12.7281 14.1049 12.7293C14.0436 12.7293 13.993 12.7557 13.9513 12.8041C13.9108 12.8513 13.8923 12.9065 13.8996 12.9644C13.9052 13.0246 13.9294 13.0707 13.971 13.1061C14.0076 13.1371 14.0442 13.1675 14.0807 13.1995C13.9367 13.3733 13.818 13.5651 13.7247 13.7676C13.6302 13.9707 13.5739 14.1721 13.5531 14.3673C13.5312 14.5641 13.552 14.7441 13.6122 14.9112C13.6723 15.0794 13.7837 15.2223 13.9463 15.3573C14.2112 15.5772 14.5228 15.6706 14.8845 15.6498C15.2451 15.6278 15.6338 15.5204 16.0517 15.296C16.3836 15.6796 16.7166 16.0604 17.049 16.4142C16.9084 16.5329 16.7852 16.601 16.6767 16.6229C16.5681 16.646 16.4713 16.6437 16.3836 16.6173C16.2958 16.5897 16.2143 16.5503 16.1395 16.4997C16.0647 16.448 15.991 16.4041 15.9173 16.3681C15.8447 16.3321 15.7699 16.3118 15.6934 16.3107C15.6169 16.3096 15.5353 16.3467 15.4453 16.4238C15.3531 16.5042 15.307 16.5976 15.307 16.7028C15.307 16.8074 15.3553 16.9137 15.4498 17.0211C15.5455 17.1286 15.6698 17.2191 15.82 17.2906C15.9702 17.362 16.14 17.407 16.3268 17.4194C16.5135 17.4323 16.7104 17.4042 16.918 17.3271C17.1267 17.2512 17.3331 17.114 17.5367 16.9098C17.6346 17.0054 17.7336 17.0965 17.832 17.1843C17.8737 17.2203 17.9243 17.2383 17.9856 17.2338C18.0447 17.2315 18.0964 17.204 18.1375 17.1545C18.1791 17.1038 18.1965 17.0481 18.1903 16.9896C18.1847 16.9306 18.1605 16.885 18.12 16.8524C18.021 16.7731 17.922 16.6898 17.8236 16.6021C17.9918 16.3956 18.1268 16.178 18.2269 15.9625C18.327 15.746 18.3861 15.5373 18.4058 15.3438C18.4255 15.1491 18.4024 14.9736 18.3388 14.8145C18.2758 14.653 18.1639 14.5146 18.0036 14.3813ZM14.8587 14.7627C14.6995 14.7695 14.5605 14.7166 14.439 14.599C14.3873 14.5495 14.3513 14.4893 14.3293 14.4179C14.3063 14.3465 14.2984 14.2683 14.3074 14.1828C14.3153 14.0984 14.3406 14.0101 14.3845 13.9212C14.4261 13.8323 14.488 13.7435 14.5667 13.6574C14.8519 13.9409 15.1365 14.252 15.4217 14.5737C15.2057 14.6924 15.0178 14.756 14.8587 14.7627ZM17.512 15.8888C17.4613 15.9822 17.4034 16.0655 17.3353 16.138C17.0198 15.8196 16.7048 15.4698 16.3903 15.1109C16.4708 15.0749 16.5552 15.0372 16.6463 14.999C16.7374 14.9607 16.8285 14.9354 16.9197 14.9196C17.013 14.9056 17.1053 14.9095 17.1975 14.9315C17.2887 14.9545 17.3753 15.004 17.4557 15.0822C17.535 15.1615 17.5851 15.2436 17.6053 15.3325C17.6273 15.4225 17.6284 15.5136 17.6132 15.607C17.5969 15.701 17.5637 15.7943 17.512 15.8888ZM15.2783 18.4763C15.3891 18.3869 15.5522 18.3914 15.654 18.4949C15.7643 18.6046 15.7643 18.784 15.654 18.8937C15.645 18.9027 15.6355 18.9089 15.6253 18.9168L15.6265 18.9179C15.2704 19.1885 14.9779 19.432 14.6623 19.7476C14.3772 20.0322 14.1195 20.332 13.8968 20.6363L13.5373 21.1285C13.5261 21.1488 13.5126 21.1673 13.4957 21.1848C13.3855 21.2945 13.206 21.2945 13.0963 21.1848C13.0007 21.0891 12.9889 20.9418 13.0592 20.8321L13.0581 20.831L13.4428 20.3056C13.683 19.9771 13.9592 19.6553 14.2647 19.3499C14.5825 19.031 14.9256 18.7463 15.2772 18.4763H15.2783ZM17.3376 10.3398C17.6222 10.0551 17.8793 9.75646 18.1026 9.45046L18.4761 8.93858C18.4896 8.91439 18.5048 8.89021 18.5256 8.86939C18.6364 8.75858 18.8158 8.75858 18.9267 8.86939C19.0318 8.97514 19.0363 9.14221 18.9407 9.25414L18.9418 9.25527L18.5571 9.78289C18.3163 10.1114 18.0407 10.432 17.7353 10.7375C17.4175 11.0553 17.0749 11.341 16.7233 11.611L16.7211 11.6099C16.6092 11.7128 16.4353 11.7106 16.3279 11.602C16.2171 11.4912 16.2171 11.3106 16.3279 11.1998C16.3476 11.179 16.3707 11.1644 16.3937 11.1515C16.7245 10.8989 17.0434 10.634 17.3376 10.3398Z"
                               fill="white" />
                       </g>
                       <defs>
                           <clipPath id="clip0_9_220">
                               <rect width="18" height="18" fill="white" transform="translate(7 6)" />
                           </clipPath>
                       </defs>
                   </svg>
               </button>
               </div>
           </form>
       </div>
   </div>
    `;

    const select = cardDiv.querySelector(".randomNumberSelect") as HTMLSelectElement;
    for (let i = 1; i <= product.quantityForSale + 1; i++) {
        const option = document.createElement("option") as HTMLOptionElement;
        option.value = `${i}`;
        option.textContent = `${i}`;
        select.appendChild(option);
        if (i > 50) {
            break;
        }
    }

    const createContainer = (amount: number) => {
        const buyContainer = document.createElement("div");
        buyContainer.className = "buyContainer";
        buyContainer.innerHTML = `
        <p>Are you sure you want to buy <b>${amount}</b> item for <b>${product.price * amount} BGN</b>?</p>
        <div class="buttons">
            <button type="submit" class='yes'>Yes</button>
            <button class='no'>No</button>
        </div>
        `;

        (buyContainer.querySelector(".yes") as HTMLElement).addEventListener('click', async e => {
            const user = JSON.parse(sessionStorage.getItem("user") as string);
            const email = user ? user.username : "eredzhepov@vsgbg.com";
            const order = { quantity: select.value, productId: product.id, email: email };
            const res = await createOrder(order);
            console.log(res);
            navigateTo('#my-orders');
        });

        closeContainerHandler(buyContainer);
        return buyContainer;
    };

    (cardDiv.querySelector(".buyButton") as HTMLElement).addEventListener("click", (e: Event) => {
        e.preventDefault();
        const buyContainer = createContainer(Number(select.value));
        const element = e.target as HTMLElement;
        const popupParent = element.parentElement as HTMLElement;
        popupParent.appendChild(buyContainer);
    });

    (cardDiv.querySelector(".productButton") as HTMLElement).addEventListener("click", async (e) => {
        e.preventDefault();
        const modal = await productModal(product);
        (document.querySelector("#addItemOverlay") as HTMLElement).style.display = "flex";
        (modal.querySelector("#modalImage") as HTMLImageElement).style.pointerEvents = "none";
        (modal.querySelector("#modalFrameOne") as HTMLElement).style.pointerEvents = "none";
        closeModalHandler(modal);
    });

    const productsSections = document.querySelector("#marketplaceMain") as HTMLElement;
    productsSections.appendChild(cardDiv);
};