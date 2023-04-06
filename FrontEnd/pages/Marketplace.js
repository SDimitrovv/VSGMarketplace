import { navbar } from "../components/navbar.js";
import { marketplaceApp } from "../src/marketplaceApp.js";

const Marketplace = () => {
    document.querySelector('#root').innerHTML = `
    ${navbar}
    <main id="marketplaceMain">
    </main>
    <div id="overlay">
    </div>
    `;
    marketplaceApp();
    // setPageScripts(['src/marketplaceApp.js']);
};

export default Marketplace;
