const Home = () => {
    document.querySelector("header").style.display = "none";

    return `
    <main id="landingMain">
        <img id="marketplaceLogo" src="images/home/vsg_marketplace_logo.png" alt="Marketplace-logo">
        <a id="loginButton" href="#marketplace" spa>
            LOGIN
        </a>
    </main>
    `;
};

export default Home;
