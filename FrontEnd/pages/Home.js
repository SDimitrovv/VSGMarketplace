import { landingApp } from "../src/landingApp.js";

const Home = () => {
    document.querySelector("header").style.display = "none";
    document.querySelector("aside").style.display = "none";
    const main = document.querySelector('main')
    main.id = "landingMain";
    main.innerHTML = `
        <img id="marketplaceLogo" src="/images/home/vsg-marketplace-logo.png" alt="Marketplace-logo">
        <a id="loginButton2" href="#marketplace" spa>
            WITHOUT LOGIN
        </a>
        <a id="loginButton">
            LOGIN
        </a>
    `;

    landingApp();
};

export default Home;
