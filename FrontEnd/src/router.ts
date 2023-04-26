import { headerUpdate, navStyling, hamburgerHandler, navbar } from "./global.ts";
import { Route, Routes } from "./types.ts";
import Home from "../pages/Home.ts";
import Inventory from "../pages/Inventory.ts";
import Marketplace from "../pages/Marketplace.ts";
import MyOrders from "../pages/MyOrders.ts";
import NotFound from "../pages/NotFound.ts";
import PendingOrders from "../pages/PendingOrders.ts";

const routes: Routes = {
  "/": Home,
  marketplace: Marketplace,
  inventory: Inventory,
  "pending-orders": PendingOrders,
  "my-orders": MyOrders,
  "404": NotFound,
};

export const navigateTo = (url: string) => {
  history.pushState(null, "", url);
  router();
};

const router = () => {
  const path: string = window.location.hash.replace("#", "") || "/";
  headerUpdate(path);
  const page: Route = routes[path];
  (document.querySelector("header") as HTMLElement).style.display = "flex";
  (document.querySelector("#closeMenu") as HTMLElement).style.display = "none";
  (document.querySelector("aside") as HTMLElement).style.display = "flex";
  (document.querySelector("main") as HTMLElement).style.display = "flex";

  if (window.innerWidth < 769) {
    (document.querySelector("#hamburger") as HTMLElement).style.display = "block";
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
  (document.querySelectorAll("a[spa]") as NodeList).forEach((link) => {
    link.addEventListener("click", onClickSPALink);
  });
};

const onClickSPALink: EventListener = (e) => {
  e.preventDefault();
  navigateTo((e.target as HTMLAnchorElement).href);
};

window.addEventListener("load", () => router());

window.addEventListener("popstate", router);
