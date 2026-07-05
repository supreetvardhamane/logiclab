// js/pages/quiz.js — End-of-module quiz engine (MCQ)
import { getState, recordQuizResult, addToSRS } from '../progress.js';
import { MODULES } from '../../data/modules.js';

// Dynamically load quiz data for a given module id
async function loadQuizData(moduleId) {
  try {
    const num = String(moduleId).padStart(2, '0');
    const mod = await import(`../../data/quizzes/m${num}-quiz.js`);
    return mod.QUIZ;
  } catch {
    return null;
  }
}

// ── Quiz state (module-level, reset per render) ────────────────
let _quiz      = null;  // QUIZ data object
let _questions = [];    // question list
let _current   = 0;    // current question index
let _answers   = [];   // { qId, correct, chosen, correctIdx, q } per question
let _answered  = false; // has current question been answered?

// ── Entry point ───────────────────────────────────────────────
export async function render(params, app) {
  const moduleId = params.id;

  const modMeta = MODULES.find(m => String(m.id) === String(moduleId));
  if (!modMeta) {
    app.innerHTML = notFoundHTML(moduleId);
    return;
  }

  const state  = getState();
  const modProg = state.modules[String(moduleId)];

  if (!modProg?.unlocked) {
    app.innerHTML = lockedHTML(modMeta);
    return;
  }

  _quiz = await loadQuizData(moduleId);
  if (!_quiz) {
    app.innerHTML = noQuizHTML(modMeta);
    return;
  }

  // Result view — shown after quiz completion (/quiz/:id/result route)
  if (location.hash.endsWith('/result')) {
    renderResult(app, modMeta, modProg, state, null);
    return;
  }

  startQuiz(app, modMeta, modProg);
}

// ── Start quiz ────────────────────────────────────────────────
function startQuiz(app, modMeta, modProg) {
  _questions = [..._quiz.questions];
  _current   = 0;
  _answers   = [];
  _answered  = false;

  renderQuestion(app, modMeta, modProg?.quiz?.attempts ?? 0);
}

// ── Render a single question ──────────────────────────────────
function renderQuestion(app, modMeta, prevAttempts) {
  const q     = _questions[_current];
  const total = _questions.length;
  const pct   = Math.round((_current / total) * 100);

  const fill = document.getElementById('quiz-progress-fill');
  if (fill) {
    fill.style.width = pct + '%';
    const bar = document.getElementById('quiz-progress-bar');
    if (bar) bar.setAttribute('aria-valuenow', pct);
  }

  app.innerHTML = `
    <div class="quiz-shell">
      <div class="quiz-header">
        <a href="#/module/${modMeta.id}" class="btn btn-ghost quiz-exit">← Exit Quiz</a>
        <span class="quiz-counter">${escHtml(modMeta.title)} · Q${_current + 1} / ${total}</span>
      </div>

      <div class="quiz-question-wrap">
        <p class="quiz-question-text">${escHtml(q.question)}</p>

        <div class="quiz-options" id="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-idx="${i}">
              <span class="quiz-option__letter">${String.fromCharCode(65 + i)}</span>
              <span class="quiz-option__text">${escHtml(opt)}</span>
            </button>
          `).join('')}
        </div>

        <div class="quiz-feedback" id="quiz-feedback" hidden>
          <div class="quiz-feedback__icon" id="quiz-feedback-icon"></div>
          <p class="quiz-feedback__explanation" id="quiz-feedback-exp"></p>
          <div class="quiz-feedback__xp" id="quiz-feedback-xp" hidden>⚡ +5 XP</div>
        </div>

        <div class="quiz-actions">
          <button class="btn btn-primary" id="quiz-next-btn" hidden>
            ${_current + 1 < total ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(btn, q, modMeta, prevAttempts, app));
  });

  document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
    _current++;
    if (_current < _questions.length) {
      _answered = false;
      renderQuestion(app, modMeta, prevAttempts);
    } else {
      finishQuiz(app, modMeta, prevAttempts);
    }
  });
}

// ── Handle answer selection ───────────────────────────────────
function handleAnswer(btn, q, modMeta, prevAttempts, app) {
  if (_answered) return;
  _answered = true;

  const chosen  = parseInt(btn.dataset.idx, 10);
  const correct = q.correct;
  const isRight = chosen === correct;

  _answers.push({ qId: q.id, correct: isRight, chosen, correctIdx: correct, q });

  document.querySelectorAll('.quiz-option').forEach((b, i) => {
    b.disabled = true;
    if (i === correct)          b.classList.add('quiz-option--correct');
    else if (i === chosen)      b.classList.add('quiz-option--wrong');
    else                        b.classList.add('quiz-option--dim');
  });

  const panel  = document.getElementById('quiz-feedback');
  const iconEl = document.getElementById('quiz-feedback-icon');
  const expEl  = document.getElementById('quiz-feedback-exp');
  const xpEl   = document.getElementById('quiz-feedback-xp');

  panel.hidden = false;
  panel.classList.add(isRight ? 'quiz-feedback--correct' : 'quiz-feedback--wrong');
  iconEl.textContent = isRight ? '✓ Correct!' : '✗ Incorrect';
  expEl.textContent  = q.explanation;
  if (isRight) xpEl.hidden = false;

  document.getElementById('quiz-next-btn').hidden = false;
}

// ── Finish quiz ───────────────────────────────────────────────
function finishQuiz(app, modMeta, prevAttempts) {
  const score    = _answers.filter(a => a.correct).length;
  const total    = _questions.length;
  const wrongIds = _answers.filter(a => !a.correct).map(a => a.qId);

  // Add wrong answers to SRS
  const state = getState();
  _answers.filter(a => !a.correct).forEach(a => {
    if (!state.srs[a.qId]) {
      addToSRS(state, a.qId, 'quiz-wrong', {
        source:   `Module ${modMeta.id} Quiz`,
        question: a.q.question,
        answer:   a.q.options[a.correctIdx],
      });
    }
  });

  recordQuizResult(modMeta.id, score, total, wrongIds);

  const fresh = {
    score,
    total,
    passed:      score >= (_quiz.passMark ?? Math.ceil(total * 0.7)),
    wrongAnswers: _answers.filter(a => !a.correct),
  };
  renderResult(app, modMeta, getState().modules[String(modMeta.id)], getState(), fresh);
}

// ── Results screen ────────────────────────────────────────────
function renderResult(app, modMeta, modProg, state, fresh) {
  const quiz     = modProg?.quiz ?? {};
  const score    = fresh?.score  ?? quiz.score  ?? 0;
  const total    = fresh?.total  ?? quiz.total  ?? (_quiz?.questions?.length ?? 0);
  const passed   = fresh?.passed ?? quiz.passed ?? false;
  const wrong    = fresh?.wrongAnswers ?? [];
  const isFirst  = (quiz.attempts ?? 1) <= 1;
  const xpEarned = passed ? (isFirst ? (_quiz?.xpFirst ?? 50) : (_quiz?.xpRetry ?? 25)) : 0;
  const nextModId = modMeta.id + 1;
  const nextMod  = MODULES.find(m => m.id === nextModId);

  const dots = Array.from({ length: total }, (_, i) =>
    `<span class="quiz-dot${i < score ? ' quiz-dot--filled' : ''}"></span>`
  ).join('');

  const wrongListHTML = wrong.length > 0 ? `
    <div class="quiz-mistakes">
      <h3 class="quiz-mistakes__title">Mistakes to Review</h3>
      ${wrong.map(a => `
        <div class="quiz-mistake-item">
          <span class="quiz-mistake-x">✗</span>
          <div class="quiz-mistake-body">
            <p class="quiz-mistake-q">${escHtml(a.q.question)}</p>
            <p class="quiz-mistake-ans">
              Your answer: <em>${escHtml(a.q.options[a.chosen])}</em>
              &nbsp;·&nbsp; Correct: <em class="quiz-correct-ans">${escHtml(a.q.options[a.correctIdx])}</em>
            </p>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  app.innerHTML = `
    <div class="quiz-shell quiz-shell--result">
      <div class="quiz-result-card">
        <h1 class="quiz-result-title">${passed ? '🎉 Quiz Complete!' : '📖 Keep Practising'}</h1>
        <div class="quiz-score-dots">${dots}</div>
        <p class="quiz-score-label">${score} / ${total} Correct</p>
        <p class="quiz-pass-status${passed ? ' quiz-pass-status--pass' : ' quiz-pass-status--fail'}">
          ${passed ? '✓ Passed' : `✗ Need ${_quiz?.passMark ?? Math.ceil(total * 0.7)} to pass`}
        </p>
        <div class="quiz-rewards">
          ${passed ? `<div class="quiz-reward-badge">⚡ +${xpEarned} XP Earned</div>` : ''}
          ${passed && nextMod ? `<div class="quiz-reward-badge quiz-reward-badge--unlock">🏆 ${escHtml(nextMod.title)} Unlocked!</div>` : ''}
        </div>
        ${wrongListHTML}
        <div class="quiz-result-actions">
          ${wrong.length > 0 ? `<a href="review.html" class="btn btn-secondary">Review Mistakes</a>` : ''}
          ${passed && nextMod ? `<a href="#/module/${nextModId}" class="btn btn-primary">Next Module →</a>` : ''}
          ${!passed ? `<a href="#/quiz/${modMeta.id}" class="btn btn-primary">Retry Quiz</a>` : ''}
          <a href="roadmap.html" class="btn btn-ghost">Go to Roadmap</a>
        </div>
      </div>
    </div>
  `;

  const fill = document.getElementById('quiz-progress-fill');
  if (fill) fill.style.width = '100%';
}

// ── Guard screens ─────────────────────────────────────────────
function notFoundHTML(id) {
  return `<div style="padding:var(--sp-8);text-align:center">
    <h1>Module not found</h1>
    <p style="color:var(--text-muted)">No module with id "${escHtml(id)}".</p>
    <a href="roadmap.html" class="btn btn-primary" style="margin-top:var(--sp-4)">Back to Roadmap</a>
  </div>`;
}

function lockedHTML(modMeta) {
  return `<div style="padding:var(--sp-8);text-align:center">
    <h1>🔒 Quiz Locked</h1>
    <p style="color:var(--text-muted);margin-top:var(--sp-2)">Complete earlier modules to unlock ${escHtml(modMeta.title)}.</p>
    <a href="roadmap.html" class="btn btn-primary" style="margin-top:var(--sp-4)">Back to Roadmap</a>
  </div>`;
}

function noQuizHTML(modMeta) {
  return `<div style="padding:var(--sp-8);text-align:center">
    <h1>Quiz Coming Soon</h1>
    <p style="color:var(--text-muted);margin-top:var(--sp-2)">The quiz for ${escHtml(modMeta.title)} is being prepared.</p>
    <a href="#/module/${modMeta.id}" class="btn btn-ghost" style="margin-top:var(--sp-4)">← Back to Module</a>
  </div>`;
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
