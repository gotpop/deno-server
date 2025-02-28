import { AppShell } from "./components/app-shell/app-shell.js";
import { Footer } from "./components/site-footer/site-footer.js";
import { GridItem } from "./components/grid-item/grid-item.js";
import { Header } from "./components/site-header/site-header.js";
import { Hero } from "./components/site-hero/site-hero.js";
import { MainContent } from "./components/main-content/main-content.js";
import { NavItem } from "./components/nav-item/nav-item.js";
import { NavList } from "./components/nav-list/nav-list.js";

const components = [
  ["app-shell", AppShell],
  ["site-header", Header],
  ["nav-list", NavList],
  ["nav-item", NavItem],
  ["site-hero", Hero],
  ["main-content", MainContent],
  ["grid-item", GridItem],
  ["site-footer", Footer],
];

// Register all components and track their definitions
const definitions = components.map(([name, constructor]) => {
  if (!customElements.get(name)) {
    customElements.define(name, constructor);
    return customElements.whenDefined(name);
  }
  return Promise.resolve();
});

// Wait for all components to be defined
Promise.all(definitions).then(() => {
  console.log("All components are ready");
});

if (location.hostname === "localhost") {
  const ws = new WebSocket(`ws://${location.host}/live-reload`);
  ws.onmessage = () => location.reload();
}
