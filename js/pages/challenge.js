// js/pages/challenge.js — LeetCode-style code challenge (CodeMirror + Piston API)
export async function render(params, app) {
  app.innerHTML = `
    <div style="padding:var(--sp-8)">
      <h1>Challenge: ${params.id}</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">
        Coming in Phase 4 — CodeMirror 6 (lazy loaded), Piston API, test case runner.
      </p>
    </div>`;
}
