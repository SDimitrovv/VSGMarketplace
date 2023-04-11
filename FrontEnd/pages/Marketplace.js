import { marketplaceApp } from "../src/marketplaceApp.js";

const Marketplace = () => {
    const main = document.querySelector('main');
    main.id = "marketplaceMain";
    main.innerHTML = '';
    marketplaceApp();
};

export default Marketplace;
