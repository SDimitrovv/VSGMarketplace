import { cardComponent } from "../components/cardComponent.js";
import { loadMarketplace } from "../src/itemsService.js";

const Marketplace = async () => {
    const main = document.querySelector('main');
    main.id = "marketplaceMain";
    main.innerHTML = '';
    const products = await loadMarketplace();
    products.forEach(p => {
        cardComponent(p);
    });
};

export default Marketplace;
