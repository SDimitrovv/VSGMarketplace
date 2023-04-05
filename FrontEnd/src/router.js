import Home from "../pages/Home.js";
import Inventory from "../pages/Inventory.js";
import Marketplace from "../pages/Marketplace.js";
import MyOrders from "../pages/MyOrders.js";
import PendingOrders from "../pages/PendingOrders.js";
import { headerUpdate, navStyling } from "./global.js";
import { hamburgerApp } from "./hamburger.js";

const head = document.querySelector("head");
const routes = {
  "/": Home,
  marketplace: Marketplace,
  inventory: Inventory,
  "pending-orders": PendingOrders,
  "my-orders": MyOrders,
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  removeSPAEventHandlers();
  router();
};

const router = () => {
  const path = window.location.hash.replace("#", "") || "/";
  headerUpdate(path);
  const page = routes[path];
  head.querySelectorAll("script").forEach((e) => e.remove());
  document.querySelector("header").style.display = "flex";
  document.querySelector("#closeMenu").style.display = "none";

  if (window.innerWidth < 769) {
    document.querySelector("#hamburger").style.display = "block";
  }
  
  page();

  if (path !== "/") {
    hamburgerApp();
  }

  handleSPALinks();
  navStyling(path);
};

export const handleSPALinks = () => {
  document.querySelectorAll("a[spa]").forEach((link) => {
    link.addEventListener("click", onClickSPALink);
  });
};

const removeSPAEventHandlers = () => {
  document.querySelectorAll("a[spa]").forEach((link) => {
    link.removeEventListener("click", onClickSPALink);
  });
};

const onClickSPALink = (e) => {
  e.preventDefault();
  const state = e.target.getAttribute("state");
  navigateTo(e.target.href, state || {});
};

window.addEventListener("load", () => {
  router();
});

window.addEventListener("popstate", router);

// window.setPageScripts = (scripts) => {
//   scripts.forEach((s) => {
//     const scriptEl = document.createElement('script');
//     scriptEl.setAttribute('src', s);
//     scriptEl.setAttribute('type', 'module');
//     scriptEl.setAttribute('defer', '');
//     head.appendChild(scriptEl);
//   })
// }
