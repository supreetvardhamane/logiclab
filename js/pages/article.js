// js/pages/article.js — Article reader with Quick Check injection
export async function render(params, app) {
  app.innerHTML = `
    <div style="padding:var(--sp-8)">
      <h1>Module ${params.id} · Article ${params.n}</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">
        Coming in Phase 2 — render.js + Prism.js + Quick Check MCQs.
      </p>
    </div>`;
}
