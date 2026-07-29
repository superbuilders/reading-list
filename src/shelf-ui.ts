type BookSummary = {
  title: string;
  shortTitle?: string;
  author: string;
};

const books: BookSummary[] = [
  { title: "The Psychology of Money", author: "Morgan Housel" },
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "Born a Crime", author: "Trevor Noah" },
  ...stripePressBooks.map(({ title, shortTitle, author }) => ({
    title,
    shortTitle,
    author,
  })),
];

export function initializeShelfUi(): void {
  const title = document.querySelector<HTMLElement>("#browseTitle");
  const author = document.querySelector<HTMLElement>("#browseAuthor");
  const current = document.querySelector<HTMLElement>("#browseCurrent");
  const inspect = document.querySelector<HTMLButtonElement>(
    "[data-inspect-active]",
  );
  const previous = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-browse-previous]"),
  );
  const next = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-browse-next]"),
  );
  const ticks = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-shelf-index]"),
  );

  let activeIndex = 3;

  const browseTo = (index: number): void => {
    activeIndex = Math.max(0, Math.min(books.length - 1, index));
    window.dispatchEvent(
      new CustomEvent("reading-list:browse-book", {
        detail: { index: activeIndex },
      }),
    );
  };

  const render = (index: number): void => {
    const book = books[index];
    if (!book) return;

    activeIndex = index;
    if (title) title.textContent = book.shortTitle || book.title;
    if (author) author.textContent = book.author;
    if (current) current.textContent = String(index + 1).padStart(2, "0");
    previous.forEach((button) => {
      button.disabled = index === 0;
    });
    next.forEach((button) => {
      button.disabled = index === books.length - 1;
    });

    for (const tick of ticks) {
      tick.toggleAttribute(
        "aria-current",
        Number(tick.dataset.shelfIndex) === index,
      );
    }
    for (const dockBook of document.querySelectorAll<HTMLElement>(
      "[data-book-index]",
    )) {
      dockBook.toggleAttribute(
        "aria-current",
        Number(dockBook.dataset.bookIndex) === index,
      );
    }
  };

  previous.forEach((button) => {
    button.addEventListener("click", () => browseTo(activeIndex - 1));
  });
  next.forEach((button) => {
    button.addEventListener("click", () => browseTo(activeIndex + 1));
  });
  inspect?.addEventListener("click", () => {
    window.dispatchEvent(
      new CustomEvent("reading-list:open-book", {
        detail: { index: activeIndex },
      }),
    );
  });

  for (const tick of ticks) {
    const select = (): void => browseTo(Number(tick.dataset.shelfIndex));
    tick.addEventListener("click", select);
    tick.addEventListener("pointerenter", select);
  }

  window.addEventListener("reading-list:active-book", (event) => {
    const index = Number((event as CustomEvent<{ index: number }>).detail.index);
    render(index);
  });

  render(activeIndex);
}
import { stripePressBooks } from "./catalog";
