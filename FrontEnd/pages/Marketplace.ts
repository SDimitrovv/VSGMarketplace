import { cardComponent } from "../components/cardComponent.ts";
import { loadMarketplace } from "../src/itemsService.ts";
import { MarketplaceProduct } from "../src/types.ts";

const Marketplace = async (): Promise<void> => {
    const main = document.querySelector("main") as HTMLElement;
    main.id = "marketplaceMain";
    main.innerHTML = "";

    const products: MarketplaceProduct[] = await loadMarketplace();
    products.forEach((p: MarketplaceProduct) => {
        cardComponent(p);
    });
};

export default Marketplace;
