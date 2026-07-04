// js/pages/roadmap.js — Visual learning path with locked/current/complete nodes
export async function render(params, app) {
  app.innerHTML = `
    <div style="padding:var(--sp-8)">
      <h1>Learning Roadmap</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">
        Coming in Phase 5 — CSS-grid path, node states, lock animations, phase progress bars.
      </p>
    </div>`;
}
