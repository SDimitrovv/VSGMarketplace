import { loginRequest, instance } from "../authConfig.js";
import { navigateTo } from "./router.js";

export const landingApp = () => {
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

    document.querySelector("#loginButton").addEventListener("click", handleLogin);
};
