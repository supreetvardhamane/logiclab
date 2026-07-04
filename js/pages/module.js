// js/pages/module.js — Module overview (article list, challenge list, quiz status)
export async function render(params, app) {
  app.innerHTML = `
    <div style="padding:var(--sp-8)">
      <h1>Module ${params.id}</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">
        Coming in Phase 2 — articles, challenges, quiz unlock logic.
      </p>
    </div>`;
}
