/**
 * LogicLab Navbar Component
 * Used on all 6 HTML shells.
 * Reads review queue count and active page from state.
 */
import { getState, toggleTheme, getDueCards } from '../progress.js';

/**
 * @param {string} activePage - 'dashboard' | 'roadmap' | 'review' | 'profile'
 */
export function renderNavbar(activePage = '') {
  const s = getState();
  const dueCount = getDueCards().length;
  const isDark   = s.settings.theme === 'dark';

  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  nav.innerHTML = `
    <a href="index.html#/" class="navbar__logo" aria-label="LogicLab home">
      <span class="navbar__logo-logic">Logic</span><span class="navbar__logo-lab">Lab</span>
    </a>

    <div class="navbar__links" role="list">
      <a href="index.html#/dashboard"
         class="nav-link ${activePage === 'dashboard' ? 'nav-link--active' : ''}"
         data-nav-link="/dashboard"
         role="listitem"
         aria-current="${activePage === 'dashboard' ? 'page' : 'false'}">
        Dashboard
      </a>
      <a href="roadmap.html#/roadmap"
         class="nav-link ${activePage === 'roadmap' ? 'nav-link--active' : ''}"
         role="listitem"
         aria-current="${activePage === 'roadmap' ? 'page' : 'false'}">
        Roadmap
      </a>
      <a href="review.html#/review"
         class="nav-link ${activePage === 'review' ? 'nav-link--active' : ''}"
         role="listitem"
         aria-current="${activePage === 'review' ? 'page' : 'false'}">
        Review
        ${dueCount > 0 ? `<span class="navbar__badge" aria-label="${dueCount} cards due">${dueCount}</span>` : ''}
      </a>
    </div>

    <div class="navbar__actions">
      <button id="theme-toggle-btn"
              class="btn-icon"
              aria-label="Toggle ${isDark ? 'light' : 'dark'} mode"
              title="Toggle theme">
        ${isDark ? '☀' : '☾'}
      </button>
      <a href="index.html#/profile"
         class="btn-icon ${activePage === 'profile' ? 'nav-link--active' : ''}"
         aria-label="Profile"
         title="Profile">
        👤
      </a>
    </div>

    <!-- Mobile hamburger -->
    <button class="navbar__hamburger" id="mobile-menu-btn" aria-label="Open menu" aria-expanded="false">
      ☰
    </button>
  `;

  // Theme toggle
  nav.querySelector('#theme-toggle-btn').addEventListener('click', () => {
    toggleTheme();
    // Re-render just the button
    const btn = nav.querySelector('#theme-toggle-btn');
    const dark = document.documentElement.dataset.theme === 'dark';
    btn.textContent = dark ? '☀' : '☾';
    btn.setAttribute('aria-label', `Toggle ${dark ? 'light' : 'dark'} mode`);
  });

  // Mobile menu toggle
  const hamburger = nav.querySelector('#mobile-menu-btn');
  const links     = nav.querySelector('.navbar__links');
  hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!open));
    links.classList.toggle('navbar__links--open', !open);
  });

  return nav;
}
