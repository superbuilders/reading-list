const MAGNIFICATION_RADIUS = 112;
const MAX_SCALE = 1.28;

export function initializeDock(): void {
  const dock = document.querySelector<HTMLElement>(".dock-shell");
  const items = Array.from(
    document.querySelectorAll<HTMLElement>(".dock-item"),
  );

  if (!dock || items.length === 0) return;

  const resetMagnification = (): void => {
    for (const item of items) {
      item.style.setProperty("--dock-scale", "1");
      item.style.setProperty("--dock-lift", "0px");
    }
  };

  dock.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    for (const item of items) {
      const bounds = item.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      const distance = Math.abs(event.clientX - center);
      const influence = Math.max(0, 1 - distance / MAGNIFICATION_RADIUS);
      const scale = 1 + influence * (MAX_SCALE - 1);

      item.style.setProperty("--dock-scale", scale.toFixed(3));
      item.style.setProperty("--dock-lift", `${(-10 * influence).toFixed(2)}px`);
    }
  });

  dock.addEventListener("pointerleave", resetMagnification);
  dock.addEventListener("focusout", () => {
    if (!dock.matches(":focus-within")) resetMagnification();
  });

  document.querySelector("[data-dock-home]")?.addEventListener("click", () => {
    document.getElementById("closeBtn")?.click();
  });

  for (const button of document.querySelectorAll<HTMLButtonElement>(
    "[data-book-index]",
  )) {
    button.addEventListener("pointerenter", () => {
      window.dispatchEvent(
        new CustomEvent("reading-list:browse-book", {
          detail: { index: Number(button.dataset.bookIndex) },
        }),
      );
    });
    button.addEventListener("click", () => {
      const index = Number(button.dataset.bookIndex);
      window.dispatchEvent(
        new CustomEvent("reading-list:open-book", { detail: { index } }),
      );
    });
  }
}
