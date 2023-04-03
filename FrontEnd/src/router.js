import { header } from "../components/header.js";
import Home from "../pages/Home.js";
import Inventory from "../pages/Inventory.js";
import Marketplace from "../pages/Marketplace.js";
import MyOrders from "../pages/MyOrders.js";
import PendingOrders from "../pages/PendingOrders.js";
import { navStyling } from "./global.js";

const root = document.getElementById("root");
const routes = {
  "/": Home,
  marketplace: Marketplace,
  inventory: Inventory,
  "pending-orders": PendingOrders,
  "my-orders": MyOrders,
};

const router = () => {
  const path = window.location.hash.replace('#', '') || '/';
  const page = routes[path];
  document.querySelector("header").style.display = "flex";
  root.innerHTML = page();
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  removeSPALinkHandlers();
  router();
  handleSPALinks();
  navStyling();
};

const onClickSpaLink = (e) => {
  e.preventDefault();
  const state = e.target.getAttribute("state");
  navigateTo(e.target.href, state || {});
};

const removeSPALinkHandlers = () => {
  document.querySelectorAll("a[spa]").forEach((link) => {
    link.removeEventListener("click", onClickSpaLink);
  });
};

const handleSPALinks = () => {
  document.querySelectorAll("a[spa]").forEach((link) => {
    link.addEventListener("click", onClickSpaLink);
  });
};

window.addEventListener("load", () => {
  router();
  handleSPALinks();
  navStyling();
});

window.addEventListener("popstate", router);
