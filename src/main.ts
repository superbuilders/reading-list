import "./style.css";
import { initializeDock } from "./dock";
import { initializeShelfUi } from "./shelf-ui";
import { renderApp } from "./template";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Reading List could not find its application root.");
}

renderApp(root);
initializeDock();
initializeShelfUi();

await import("./experience");
