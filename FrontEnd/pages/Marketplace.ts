import { cardComponent } from "../components/cardComponent.js";
import { loadMarketplace } from "../src/itemsService.js";

const Marketplace = async (): Promise<void> => {
    const main = document.querySelector("main") as HTMLElement;
    main.id = "marketplaceMain";
    main.innerHTML = "";

    type Product = {
        categoryId: number;
        code: string;
        description: string;
        fullName: string;
        id: number;
        imageUrl: string;
        price: number;
        quantity: number;
        quantityForSale: number;
        type: string;
    };

    const products: Product[] = await loadMarketplace();
    products.forEach((p: Product) => {
        cardComponent(p);
    });
};

export default Marketplace;
