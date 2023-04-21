import { instance, loginRequest } from "../authConfig";
import { navigateTo } from "../src/router";

const Home = () => {
    document.querySelector("header").style.display = "none";
    document.querySelector("aside").style.display = "none";
    const main = document.querySelector('main');
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

    sessionStorage.clear();
    const handleLogin = async () => {
        try {
            const result = await instance.loginPopup(loginRequest);
            sessionStorage.setItem("user", JSON.stringify(result.account));
            navigateTo("#marketplace");
            location.reload();
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    main.querySelector("#loginButton").addEventListener("click", handleLogin);
};

export default Home;
