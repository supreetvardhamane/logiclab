/**
 * LogicLab — Article Renderer (render.js)
 *
 * Converts an article JS object (with a `blocks` array) into live DOM.
 * Triggers Prism.js syntax highlighting on all code blocks.
 * Injects Quick Check MCQs at `qc` marker positions.
 *
 * Article block types:
 *   { type: 'heading',   text }
 *   { type: 'subheading', text }
 *   { type: 'text',      html }
 *   { type: 'code',      lang, code }
 *   { type: 'list',      items: string[], ordered? }
 *   { type: 'note',      variant: 'tip'|'warn'|'info', text }
 *   { type: 'qc',        id, question, options, correct }
 *
 * Reading-progress bar: wired to the #reading-progress element in learn.html.
 */

// ── BLOCK RENDERERS ──────────────────────────────────────────────────────────

function renderHeading(block) {
  const el = document.createElement('h2');
  el.textContent = block.text;
  return el;
}

function renderSubheading(block) {
  const el = document.createElement('h3');
  el.textContent = block.text;
  return el;
}

function renderText(block) {
  const el = document.createElement('p');
  el.innerHTML = block.html;
  return el;
}

function renderCode(block) {
  const lang = block.lang || 'cpp';
  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:relative;margin-bottom:var(--sp-4)';

  const langLabel = document.createElement('div');
  langLabel.className = 'lang-label';
  langLabel.textContent = lang.toUpperCase();

  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-btn';
  copyBtn.setAttribute('aria-label', 'Copy code');
  copyBtn.textContent = 'Copy';
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(block.code).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    });
  });

  const pre  = document.createElement('pre');
  const code = document.createElement('code');
  code.className = `language-${lang}`;
  code.textContent = block.code;
  pre.appendChild(code);

  pre.appendChild(langLabel);
  pre.appendChild(copyBtn);
  wrap.appendChild(pre);
  return wrap;
}

function renderList(block) {
  const el = document.createElement(block.ordered ? 'ol' : 'ul');
  block.items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = item;
    el.appendChild(li);
  });
  return el;
}

const NOTE_ICONS = { tip: '💡', warn: '⚠️', info: 'ℹ️' };
const NOTE_COLORS = {
  tip:  { bg: 'rgba(108,71,255,.08)', border: 'var(--brand-purple)', icon: '#a78bfa' },
  warn: { bg: 'rgba(245,158,11,.08)', border: '#f59e0b',             icon: '#f59e0b' },
  info: { bg: 'rgba(59,130,246,.08)', border: '#3b82f6',             icon: '#60a5fa' },
};

function renderNote(block) {
  const variant = block.variant || 'tip';
  const colors  = NOTE_COLORS[variant] || NOTE_COLORS.info;
  const el = document.createElement('div');
  el.style.cssText = `
    background: ${colors.bg};
    border-left: 3px solid ${colors.border};
    border-radius: 0 8px 8px 0;
    padding: var(--sp-3) var(--sp-4);
    margin-bottom: var(--sp-4);
    display: flex;
    gap: var(--sp-3);
    align-items: flex-start;
  `;
  el.innerHTML = `
    <span style="font-size:1.2rem;flex-shrink:0;margin-top:1px">${NOTE_ICONS[variant]}</span>
    <span style="font-size:var(--text-sm);line-height:1.6">${block.text}</span>
  `;
  return el;
}

// ── QUICK CHECK ──────────────────────────────────────────────────────────────

/**
 * Renders a Quick Check MCQ block.
 * Returns { el, answered } — el is the DOM node, answered is a { value } reference
 * that becomes true once the user picks the correct answer.
 * The caller is responsible for blocking scroll past this element until answered.
 */
function renderQC(block) {
  const state = { answered: false };
  const el = document.createElement('div');
  el.className = 'qc-marker';
  el.dataset.qcId = block.id;

  const card = document.createElement('div');
  card.style.cssText = `
    background: var(--surface-2);
    border: 2px solid var(--brand-purple);
    border-radius: 12px;
    padding: var(--sp-5);
    margin: var(--sp-6) 0;
  `;

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;gap:var(--sp-2);margin-bottom:var(--sp-4)';
  header.innerHTML = `
    <span style="font-size:1.3rem">🧠</span>
    <span style="font-size:var(--text-sm);font-weight:700;color:var(--brand-purple);letter-spacing:.5px">
      QUICK CHECK
    </span>
  `;

  const question = document.createElement('p');
  question.style.cssText = 'font-weight:600;margin-bottom:var(--sp-4);font-size:var(--text-body)';
  question.textContent = block.question;

  const optionsList = document.createElement('div');
  optionsList.style.cssText = 'display:flex;flex-direction:column;gap:var(--sp-2)';

  const feedback = document.createElement('div');
  feedback.style.cssText = 'margin-top:var(--sp-4);font-size:var(--text-sm);font-weight:600;display:none';

  block.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.dataset.idx = i;

    btn.addEventListener('click', () => {
      if (state.answered) return;

      const correct = (i === block.correct);
      optionsList.querySelectorAll('.quiz-option').forEach((b, j) => {
        b.disabled = true;
        if (j === block.correct)    b.classList.add('quiz-option--correct');
        else if (j === i && !correct) b.classList.add('quiz-option--wrong');
      });

      if (correct) {
        feedback.textContent = '✓ Correct! ' + (block.explanation || '');
        feedback.style.color = 'var(--green)';
        state.answered = true;
        el.dispatchEvent(new CustomEvent('qc-answered', { bubbles: true, detail: { id: block.id, correct: true } }));
      } else {
        feedback.textContent = '✗ Not quite — the highlighted option is correct. ' + (block.explanation || '');
        feedback.style.color = 'var(--red)';
        // Still let them move on after seeing the answer
        setTimeout(() => {
          state.answered = true;
          el.dispatchEvent(new CustomEvent('qc-answered', { bubbles: true, detail: { id: block.id, correct: false } }));
        }, 1200);
      }
      feedback.style.display = 'block';
    });

    optionsList.appendChild(btn);
  });

  card.appendChild(header);
  card.appendChild(question);
  card.appendChild(optionsList);
  card.appendChild(feedback);
  el.appendChild(card);

  return { el, state };
}

// ── MAIN RENDER FUNCTION ─────────────────────────────────────────────────────

/**
 * Renders an article into `container`.
 *
 * @param {Object} article  — The full article object from data/content/mXX-aNN.js
 * @param {HTMLElement} container — DOM element to render into (cleared first)
 * @returns {{ qcStates: Array }} — array of { id, state } for Quick Checks
 */
export function renderArticle(article, container) {
  container.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'article-content';

  const qcStates = [];

  (article.blocks || []).forEach(block => {
    let node;

    switch (block.type) {
      case 'heading':    node = renderHeading(block);    break;
      case 'subheading': node = renderSubheading(block); break;
      case 'text':       node = renderText(block);       break;
      case 'code':       node = renderCode(block);       break;
      case 'list':       node = renderList(block);       break;
      case 'note':       node = renderNote(block);       break;
      case 'qc': {
        const { el, state } = renderQC(block);
        qcStates.push({ id: block.id, state });
        node = el;
        break;
      }
      default:
        console.warn('[render] Unknown block type:', block.type);
        return;
    }

    if (node) inner.appendChild(node);
  });

  container.appendChild(inner);

  // Trigger Prism.js after DOM is built
  if (window.Prism) {
    window.Prism.highlightAllUnder(inner);
  }

  return { qcStates };
}

// ── READING PROGRESS BAR ─────────────────────────────────────────────────────

let _progressBar = null;
let _progressTarget = null;

/**
 * Initialise the reading progress bar.
 * @param {HTMLElement} articleBody — the scrollable content element to track
 */
export function initReadingProgress(articleBody) {
  _progressBar    = document.getElementById('reading-progress');
  _progressTarget = articleBody;
  if (!_progressBar || !_progressTarget) return;

  window.addEventListener('scroll', updateReadingProgress, { passive: true });
  updateReadingProgress(); // initial paint
}

export function destroyReadingProgress() {
  window.removeEventListener('scroll', updateReadingProgress);
  if (_progressBar) _progressBar.style.transform = 'scaleX(0)';
  _progressBar    = null;
  _progressTarget = null;
}

function updateReadingProgress() {
  if (!_progressBar || !_progressTarget) return;
  const rect    = _progressTarget.getBoundingClientRect();
  const total   = _progressTarget.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const ratio   = total > 0 ? Math.min(1, scrolled / total) : 0;
  _progressBar.style.transform = `scaleX(${ratio})`;
  _progressBar.style.transformOrigin = 'left';
  return ratio;
}

// ── TOAST HELPER ─────────────────────────────────────────────────────────────

/**
 * Show a brief toast notification.
 * variant: 'xp' | 'success' | 'info' | 'badge' | 'error'
 */
export function showToast(message, variant = 'success', durationMs = 2800) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${variant}`;
  toast.setAttribute('role', 'status');
  toast.textContent = message;

  container.appendChild(toast);
  // Animate in
  requestAnimationFrame(() => toast.classList.add('toast--visible'));

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, durationMs);
}
