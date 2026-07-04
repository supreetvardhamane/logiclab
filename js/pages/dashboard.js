// js/pages/dashboard.js
export async function render(params, app) {
  app.innerHTML = `
    <div style="padding:var(--sp-8)">
      <h1>Dashboard</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">
        Coming in Phase 3 — XP bar, streak, continue learning, review queue.
      </p>
    </div>`;
}
