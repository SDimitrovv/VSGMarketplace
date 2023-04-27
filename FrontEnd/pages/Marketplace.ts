import { cardComponent } from "../components/cardComponent.ts";
import { loadMarketplace } from "../src/itemsService.ts";

const Marketplace = async (): Promise<void> => {
    const main = document.querySelector("main") as HTMLElement;
    main.id = "marketplaceMain";
    main.innerHTML = "";

    const products = await loadMarketplace();

    for (let i = 0; i < products.length; i++) {
        setTimeout(() => {
            cardComponent(products[i]);
        }, i * 10);
    }
};

export default Marketplace;
