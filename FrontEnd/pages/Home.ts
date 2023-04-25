import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { instance, loginRequest } from "../authConfig.ts";
import { navigateTo } from "../src/router";

const Home = () => {
    (document.querySelector("header") as HTMLElement).style.display = "none";
    (document.querySelector("aside") as HTMLElement).style.display = "none";
    const main = document.querySelector('main') as HTMLElement;
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
    const handleLogin = async (): Promise<void> => {
        try {
            const result: AuthenticationResult = await instance.loginPopup(loginRequest);
            const user = result.account as AccountInfo;
            sessionStorage.setItem("user", JSON.stringify(user));
            navigateTo("#marketplace");
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    (main.querySelector("#loginButton") as HTMLElement).addEventListener("click", handleLogin);
};

export default Home;
