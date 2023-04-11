import Home from "../pages/Home.js";
import Inventory from "../pages/Inventory.js";
import Marketplace from "../pages/Marketplace.js";
import MyOrders from "../pages/MyOrders.js";
import NotFound from "../pages/NotFound.js";
import PendingOrders from "../pages/PendingOrders.js";
import { headerUpdate, navStyling } from "./global.js";
import { hamburgerHandler } from "./hamburger.js";
import { navbar } from "./navbar.js";

const routes = {
  "/": Home,
  marketplace: Marketplace,
  inventory: Inventory,
  "pending-orders": PendingOrders,
  "my-orders": MyOrders,
  "404": NotFound,
};

export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = () => {
  const path = window.location.hash.replace("#", "") || "/";
  headerUpdate(path);
  const page = routes[path];
  document.querySelector("header").style.display = "flex";
  document.querySelector("#closeMenu").style.display = "none";
  document.querySelector("aside").style.display = "flex";
  document.querySelector("main").style.display = "flex";

  if (window.innerWidth < 769) {
    document.querySelector("#hamburger").style.display = "block";
  }
  page();

  if (path !== "/") {
    navbar();
    hamburgerHandler();
  }

  handleSPALinks();
  navStyling(path);
};

export const handleSPALinks = () => {
  document.querySelectorAll("a[spa]").forEach((link) => {
    link.addEventListener("click", onClickSPALink);
  });
};

// const removeSPAEventHandlers = () => {
//   document.querySelectorAll("a[spa]").forEach((link) => {
//     link.removeEventListener("click", onClickSPALink);
//   });
// };

const onClickSPALink = (e) => {
  e.preventDefault();
  const state = e.target.getAttribute("state");
  navigateTo(e.target.href, state || {});
};

window.addEventListener("load", () => {
  router();
});

window.addEventListener("popstate", router);
