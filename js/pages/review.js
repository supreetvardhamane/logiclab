// js/pages/review.js — Spaced repetition review session (SM-2 flashcards)
export async function render(params, app) {
  app.innerHTML = `
    <div style="padding:var(--sp-8)">
      <h1>Review Session</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">
        Coming in Phase 3 — SM-2 card display, Know it / Almost / No idea self-rating.
      </p>
    </div>`;
}
