const bookIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5.5 4.5h8a3 3 0 0 1 3 3v12h-8a3 3 0 0 0-3 1.5V4.5Z" />
    <path d="M18.5 6.5h-2v13h2V6.5Z" />
  </svg>
`;

export function renderApp(root: HTMLElement): void {
  root.innerHTML = `
    <div class="hero-word" aria-hidden="true"><span>Reading</span></div>
    <div class="hero-note">
      <span class="eyebrow">A considered shelf</span>
      <p>Three books worth reading—and returning to.</p>
    </div>

    <div class="shelf-masthead" aria-hidden="true">
      <div>
        <span>The Reading List</span>
        <i></i>
        <span>An interactive library</span>
      </div>
      <div class="shelf-edition">
        <span>03 volumes</span>
        <span>01 considered shelf</span>
      </div>
    </div>

    <section class="browse-caption" aria-live="polite">
      <p class="browse-position">
        <span id="browseCurrent">02</span>
        <i></i>
        <span>03</span>
      </p>
      <h1 id="browseTitle">The Alchemist</h1>
      <p class="browse-author" id="browseAuthor">Paulo Coelho</p>
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

    <div class="shelf-ruler" aria-label="Browse the three-book shelf">
      <div class="shelf-ruler-line"></div>
      <button type="button" data-shelf-index="0" aria-label="Browse to The Psychology of Money"><span></span></button>
      <button type="button" data-shelf-index="1" aria-label="Browse to The Alchemist" aria-current="true"><span></span></button>
      <button type="button" data-shelf-index="2" aria-label="Browse to Born a Crime"><span></span></button>
      <p aria-hidden="true">Hover · drag · arrow keys</p>
    </div>

    <canvas id="gl"></canvas>

    <nav class="dock" aria-label="Reading list navigation">
      <div class="dock-shell">
        <button class="dock-item dock-home" type="button" data-dock-home aria-label="Return to the full reading list">
          <span class="dock-brand" aria-hidden="true">R</span>
          <span class="dock-tooltip" role="tooltip">Reading list</span>
        </button>
        <span class="dock-separator" aria-hidden="true"></span>
        <button class="dock-item" type="button" data-book-index="0" aria-label="Open The Psychology of Money">
          ${bookIcon}
          <span class="dock-index" aria-hidden="true">1</span>
          <span class="dock-tooltip" role="tooltip">Psychology of Money</span>
        </button>
        <button class="dock-item" type="button" data-book-index="1" aria-label="Open The Alchemist">
          ${bookIcon}
          <span class="dock-index" aria-hidden="true">2</span>
          <span class="dock-tooltip" role="tooltip">The Alchemist</span>
        </button>
        <button class="dock-item" type="button" data-book-index="2" aria-label="Open Born a Crime">
          ${bookIcon}
          <span class="dock-index" aria-hidden="true">3</span>
          <span class="dock-tooltip" role="tooltip">Born a Crime</span>
        </button>
        <span class="dock-separator" aria-hidden="true"></span>
        <a
          class="dock-item"
          href="https://github.com/Superbuilders/reading-list"
          target="_blank"
          rel="noreferrer"
          aria-label="View the Reading List source on GitHub"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.8a9.4 9.4 0 0 0-3 18.3c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.3-2.3-.3-4.7-1.1-4.7-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.7s.9-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.7 3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5A9.4 9.4 0 0 0 12 2.8Z" />
          </svg>
          <span class="dock-tooltip" role="tooltip">View source</span>
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
        <div class="src">Goodreads</div>
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
