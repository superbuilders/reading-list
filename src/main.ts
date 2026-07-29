import "./style.css";
import { renderApp } from "./template";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Reading List could not find its application root.");
}

renderApp(root);

await import("./experience");
