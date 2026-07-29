import { alphaBookshelfKids } from "./catalog";

export function renderApp(root: HTMLElement): void {
  // The reading list is now sourced from the Alpha Bookshelf kids catalog.
  // Placeholder titles (Psychology of Money / Alchemist / Born a Crime)
  // have been removed — they were stand-ins for the real list.
  const library = alphaBookshelfKids;
  const total = String(library.length).padStart(2, "0");
  const shelfTicks = library
    .map(
      (book, index) => `
        <button type="button" data-shelf-index="${index}" aria-label="Browse to ${book.title}"${index === 3 ? ' aria-current="true"' : ""}><span></span></button>`,
    )
    .join("");
  root.innerHTML = `
    <div class="hero-word" aria-hidden="true"><span>Reading</span></div>
    <div class="hero-note">
      <span class="eyebrow">A considered shelf</span>
      <p>A growing library worth reading—and returning to.</p>
    </div>

    <div class="shelf-masthead" aria-hidden="true">
      <div>
        <span>The Reading List</span>
        <i></i>
        <span>An interactive library</span>
      </div>
      <div class="shelf-edition">
        <span>${total} volumes</span>
        <span>01 considered shelf</span>
      </div>
    </div>

    <section class="browse-caption" aria-live="polite">
      <p class="browse-position">
        <span id="browseCurrent">04</span>
        <i></i>
        <span>${total}</span>
      </p>
      <h1 id="browseTitle">Maintenance</h1>
      <p class="browse-author" id="browseAuthor">Stewart Brand</p>
      <button type="button" class="inspect-volume" data-inspect-active>
        <span>Inspect volume</span>
        <span aria-hidden="true">↗</span>
      </button>
    </section>

    <button type="button" class="shelf-arrow shelf-arrow-left" data-browse-previous aria-label="Previous book">
      <span aria-hidden="true">←</span>
    </button>
    <button type="button" class="shelf-arrow shelf-arrow-right" data-browse-next aria-label="Next book">
      <span aria-hidden="true">→</span>
    </button>

    <div class="shelf-furniture" aria-hidden="true">
      <div class="shelf-surface"></div>
      <div class="shelf-edge"></div>
      <div class="shelf-shadow"></div>
    </div>

    <div class="shelf-ruler" style="--book-count: ${library.length}" aria-label="Browse the ${library.length}-book shelf">
      <div class="shelf-ruler-line"></div>
      ${shelfTicks}
      <p aria-hidden="true">Hover · drag · arrow keys</p>
    </div>

    <canvas id="gl"></canvas>

    <nav class="dock" aria-label="Reading list navigation">
      <div class="dock-shell">
        <button class="dock-item dock-home" type="button" data-dock-home aria-label="Return to the full reading list">
          <svg class="home-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m4 10.5 8-6.5 8 6.5" />
            <path d="M6.5 9.5V20h11V9.5" />
            <path d="M10 20v-6h4v6" />
          </svg>
          <span class="dock-tooltip" role="tooltip">Return to shelf</span>
        </button>
        <span class="dock-separator" aria-hidden="true"></span>
        <span class="dock-key-hint">
          <button type="button" data-browse-previous aria-label="Browse to the previous book">←</button>
          <span>Browse</span>
          <button type="button" data-browse-next aria-label="Browse to the next book">→</button>
        </span>
        <span class="dock-separator" aria-hidden="true"></span>
        <a
          class="dock-item dock-alpha"
          href="https://alpha.school/"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Alpha School"
        >
          <img
            class="alpha-logo-icon"
            src="https://alpha.school/wp-content/uploads/2024/04/cropped-2hr-Logos-All_2hr-Learning-Logo-Alpha-192x192.webp"
            alt=""
          />
          <span class="dock-tooltip" role="tooltip">Alpha School</span>
        </a>
      </div>
    </nav>

    <button id="openBtn">Explore book</button>
    <button id="closeBtn" aria-label="Close detail view">&#10005;</button>

    <div class="dp" id="dp" aria-live="polite">
      <h1 id="dpTitle"></h1>
      <p id="dpDesc"></p>
      <div class="meta">
        <div class="stars" id="dpStars"></div>
        <div class="sep"></div>
        <div class="src" id="dpSource">Goodreads</div>
        <div class="year" id="dpYear"></div>
      </div>
      <div class="rule"></div>
      <div class="actions">
        <span class="pill lang">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.8 2.6 2.8 15.4 0 18M12 3c-2.8 2.6-2.8 15.4 0 18" />
          </svg>
          <span>English</span>
        </span>
        <a class="pill buy" id="bookLink" href="#" target="_blank" rel="noreferrer">Find the book</a>
        <a class="pill buy" id="audioLink" href="#" target="_blank" rel="noreferrer">Find audiobook</a>
      </div>
    </div>
  `;
}
