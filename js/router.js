/**
 * LogicLab — Hash-Based SPA Router
 * Usage: createRouter({ '/': loader, '/module/:id': loader, ... })
 * Each HTML shell calls createRouter with its own route table.
 * Routes use /:param syntax; params are passed to render(params, app).
 */

let _currentPath = null;
let _routes = {};

/**
 * Match a URL pattern against an actual path.
 * Returns params object if matched, null otherwise.
 * e.g. matchRoute('/module/:id/article/:n', '/module/7/article/3')
 *      → { id: '7', n: '3' }
 */
function matchRoute(pattern, path) {
  const pp = pattern.split('/');
  const hp = path.split('/');
  if (pp.length !== hp.length) return null;
  const params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) {
      params[pp[i].slice(1)] = decodeURIComponent(hp[i]);
    } else if (pp[i] !== hp[i]) {
      return null;
    }
  }
  return params;
}

async function route() {
  const rawHash = location.hash.slice(1) || '/';
  // Normalize: strip trailing slash except for root
  const path = rawHash.length > 1 ? rawHash.replace(/\/$/, '') : rawHash;

  if (path === _currentPath) return;
  _currentPath = path;

  const app = document.getElementById('app');
  if (!app) return;

  // Show loading indicator
  app.setAttribute('aria-busy', 'true');

  for (const [pattern, loader] of Object.entries(_routes)) {
    const params = matchRoute(pattern, path);
    if (params !== null) {
      try {
        const mod = await loader();
        if (mod && typeof mod.render === 'function') {
          app.innerHTML = '';
          await mod.render(params, app);
          // Scroll to top on navigation
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } catch (err) {
        console.error('[Router] Failed to load page:', path, err);
        app.innerHTML = `
          <div style="padding:2rem;text-align:center">
            <h2>Something went wrong</h2>
            <p style="color:var(--text-muted);margin-top:.5rem">${err.message}</p>
            <button class="btn btn-primary" style="margin-top:1rem" onclick="location.hash='/'">
              Go Home
            </button>
          </div>`;
      }
      app.removeAttribute('aria-busy');
      updateNavActive(path);
      return;
    }
  }

  // 404
  app.innerHTML = `
    <div style="padding:4rem 2rem;text-align:center">
      <div style="font-size:4rem;margin-bottom:1rem">404</div>
      <h2>Page not found</h2>
      <p style="color:var(--text-muted);margin-top:.5rem">
        No route matched: <code>${path}</code>
      </p>
      <a href="#/" class="btn btn-primary" style="margin-top:1.5rem;display:inline-flex">
        Back to Dashboard
      </a>
    </div>`;
  app.removeAttribute('aria-busy');
}

/** Highlight the active nav link based on the current path */
function updateNavActive(path) {
  document.querySelectorAll('[data-nav-link]').forEach(el => {
    const target = el.dataset.navLink;
    const isActive = path === target || (target !== '/' && path.startsWith(target));
    el.classList.toggle('nav-link--active', isActive);
    el.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

/**
 * Navigate programmatically.
 * e.g. navigate('/module/7/article/3')
 */
export function navigate(path) {
  location.hash = path;
}

/**
 * Initialise the router for a given page.
 * @param {Object} routes - Map of pattern → () => import(...)
 */
export function createRouter(routes) {
  _routes = routes;
  _currentPath = null; // reset so first load always renders
  window.addEventListener('hashchange', route);
  route(); // render immediately on load
}
