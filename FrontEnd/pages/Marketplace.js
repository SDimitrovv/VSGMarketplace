import { cardComponent } from "../components/cardComponent.js";
import { loadMarketplace } from "../src/itemsService.js";

const Marketplace = async () => {
    const main = document.querySelector('main');
    main.id = "marketplaceMain";
    main.innerHTML = '';
    const products = await loadMarketplace();
    products.forEach((p) => {
        cardComponent(p.id, p.price, p.quantityForSale, p.type, p.imageUrl);
    });
};

export default Marketplace;
