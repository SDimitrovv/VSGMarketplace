const Home = () => {
    document.querySelector("header").style.display = "none";
    document.querySelector('#root').innerHTML = `
    <main id="landingMain">
        <img id="marketplaceLogo" src="/images/home/vsg-marketplace-logo.png" alt="Marketplace-logo">
        <a id="loginButton" href="#marketplace" spa>
            LOGIN
        </a>
    </main>
    `;
};

export default Home;
