import { instance } from "../authConfig.ts";

export const navbar = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const name = user ? user.name.split(" ")[0] : "User";
    document.querySelector(".profileGreet span").textContent = `Hi, ${name} `;
    document.querySelector(".profileGreet2 span").textContent = `Hi, ${name}`;
    document.querySelector("#logout .navButton").addEventListener("click", async (e) => {
        e.preventDefault();
        await instance.logoutRedirect({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/",
        });
    });
};
