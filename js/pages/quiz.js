// js/pages/quiz.js — End-of-module quiz (MCQ engine)
export async function render(params, app) {
  const isResult = params.view === 'result';
  app.innerHTML = `
    <div style="padding:var(--sp-8)">
      <h1>Module ${params.id} Quiz${isResult ? ' — Results' : ''}</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">
        Coming in Phase 3 — quiz engine, SM-2 wrong-answer integration, unlock flow.
      </p>
    </div>`;
}
