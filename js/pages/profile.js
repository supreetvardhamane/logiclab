// js/pages/profile.js — Profile: stats, badges, progress by phase
export async function render(params, app) {
  app.innerHTML = `
    <div style="padding:var(--sp-8)">
      <h1>Profile</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">
        Coming in Phase 5 — stats grid, badges panel, progress by phase.
      </p>
    </div>`;
}
