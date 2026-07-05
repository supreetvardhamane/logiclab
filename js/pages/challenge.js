// js/pages/challenge.js — C++ code challenge with Piston API execution
import { getState, recordChallengeSolved, recordHintUsed } from '../progress.js';
import { MODULES } from '../../data/modules.js';
import { showToast } from '../render.js';

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';
const CPP_LANG   = 'c++';
const CPP_VER    = '10.2.0';

// ── Find challenge across all modules ────────────────────────
function findChallenge(id) {
  for (const mod of MODULES) {
    const ch = (mod.challenges ?? []).find(c => c.id === id);
    if (ch) return { challenge: ch, module: mod };
  }
  return null;
}

// ── Timer helpers ────────────────────────────────────────────
let _timerInterval = null;
let _startTime     = null;
let _elapsed       = 0;     // seconds

function startTimer(displayEl) {
  _startTime = Date.now() - _elapsed * 1000;
  _timerInterval = setInterval(() => {
    _elapsed = Math.floor((Date.now() - _startTime) / 1000);
    displayEl.textContent = formatTime(_elapsed);
  }, 1000);
}

function stopTimer() {
  clearInterval(_timerInterval);
  _timerInterval = null;
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// ── Main render ───────────────────────────────────────────────
export async function render(params, app) {
  stopTimer();
  _elapsed = 0;

  const found = findChallenge(params.id);
  if (!found) {
    app.innerHTML = `<div style="padding:var(--sp-8);text-align:center">
      <h1>Challenge not found</h1>
      <p style="color:var(--text-muted);margin-top:var(--sp-2)">No challenge with id "${escHtml(params.id)}".</p>
      <a href="roadmap.html" class="btn btn-primary" style="margin-top:var(--sp-4)">Back to Roadmap</a>
    </div>`;
    return;
  }

  const { challenge: ch, module: mod } = found;
  const state     = getState();
  const prevSolve = state.challenges[ch.id];
  const alreadySolved = !!prevSolve?.solved;
  const attempts  = prevSolve?.attempts ?? 0;
  const canViewSolution = attempts >= 2;

  const DIFF_COLOR = { easy: 'var(--green)', medium: 'var(--orange)', hard: 'var(--red)' };

  app.style.display        = 'flex';
  app.style.flexDirection  = 'column';
  app.style.height         = '100%';
  app.style.overflow       = 'hidden';

  app.innerHTML = `
    <!-- Challenge top bar -->
    <div class="ch-topbar">
      <a href="learn.html#/module/${mod.id}" class="btn btn-ghost ch-back">← Module ${mod.id}</a>
      <span class="ch-title">${escHtml(ch.title)}</span>
      <span class="ch-meta">
        <span style="color:${DIFF_COLOR[ch.difficulty] ?? 'var(--text-muted)'}">
          ${escHtml(ch.difficulty)}
        </span>
        &nbsp;·&nbsp;
        <span style="color:var(--orange)">⚡ ${ch.xp} XP</span>
        &nbsp;·&nbsp;
        <span id="ch-timer" class="ch-timer">00:00</span>
      </span>
    </div>

    <!-- Split layout -->
    <div class="ch-split">

      <!-- LEFT: Problem panel -->
      <div class="ch-panel ch-panel--left" id="ch-left">
        <div class="ch-tabs" id="ch-tabs">
          <button class="ch-tab ch-tab--active" data-tab="problem">Problem</button>
          <button class="ch-tab" data-tab="hints">Hints</button>
          ${alreadySolved || canViewSolution ? `<button class="ch-tab" data-tab="solution">Solution</button>` : ''}
        </div>

        <div class="ch-tab-content" id="ch-tab-problem">
          <div class="ch-prompt">${escHtml(ch.prompt)}</div>
          ${alreadySolved ? `
            <div class="ch-solved-badge">
              ✓ Solved · ${prevSolve.attempts} attempt${prevSolve.attempts !== 1 ? 's' : ''}
              · ${formatTime(prevSolve.timeSeconds ?? 0)}
              ${!prevSolve.usedSolution ? ' · +' + ch.xp + ' XP' : ' · solution viewed (no XP)'}
            </div>` : ''}
        </div>

        <div class="ch-tab-content" id="ch-tab-hints" hidden>
          ${buildHintsHTML(ch)}
        </div>

        ${alreadySolved || canViewSolution ? `
          <div class="ch-tab-content" id="ch-tab-solution" hidden>
            <div class="ch-solution-warn">
              ${!alreadySolved ? '⚠ Viewing the solution means you will not earn XP for this challenge.' : ''}
            </div>
            ${ch.solution ? `<pre class="ch-solution-code language-cpp"><code>${escHtml(ch.solution)}</code></pre>` : '<p style="color:var(--text-muted)">Solution not available yet.</p>'}
          </div>` : ''}
      </div>

      <!-- RIGHT: Editor + output panel -->
      <div class="ch-panel ch-panel--right">
        <div class="ch-editor-header">
          <span class="ch-lang-badge">C++17</span>
          <button class="ch-reset-btn" id="ch-reset-btn" title="Reset to starter code">↺ Reset</button>
        </div>

        <div class="ch-editor-wrap">
          <textarea
            id="ch-editor"
            class="ch-editor"
            spellcheck="false"
            autocorrect="off"
            autocapitalize="off"
          >${escHtml(ch.starterCode ?? DEFAULT_STARTER)}</textarea>
        </div>

        <div class="ch-run-bar">
          <button class="btn btn-primary ch-run-btn" id="ch-run-btn">▶ Run Code</button>
          ${!alreadySolved ? `<button class="btn btn-secondary ch-solved-btn" id="ch-solved-btn" hidden>✓ Mark as Solved</button>` : `<span class="ch-already-solved">✓ Already solved</span>`}
        </div>

        <div class="ch-output-wrap" id="ch-output-wrap" hidden>
          <div class="ch-output-header">
            <span>Output</span>
            <button class="ch-clear-btn" id="ch-clear-btn">✕</button>
          </div>
          <pre class="ch-output" id="ch-output"></pre>
        </div>
      </div>

    </div>
  `;

  // Start timer
  startTimer(document.getElementById('ch-timer'));

  // Wire tab switching
  document.getElementById('ch-tabs')?.addEventListener('click', e => {
    const tab = e.target.dataset?.tab;
    if (!tab) return;
    document.querySelectorAll('.ch-tab').forEach(t => t.classList.toggle('ch-tab--active', t.dataset.tab === tab));
    document.querySelectorAll('.ch-tab-content').forEach(c => { c.hidden = !c.id.endsWith(tab); });

    // Record hint view
    if (tab === 'hints') recordHintUsed(ch.id);
    // Record solution view
    if (tab === 'solution' && !alreadySolved) {
      _solutionViewed = true;
    }
  });

  // Tab key support in textarea
  const editor = document.getElementById('ch-editor');
  editor.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = editor.selectionStart;
      const v = editor.value;
      editor.value = v.slice(0, s) + '    ' + v.slice(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = s + 4;
    }
  });

  // Reset button
  document.getElementById('ch-reset-btn').addEventListener('click', () => {
    if (confirm('Reset to starter code? Your changes will be lost.')) {
      editor.value = ch.starterCode ?? DEFAULT_STARTER;
    }
  });

  // Run button
  document.getElementById('ch-run-btn').addEventListener('click', () => runCode(ch, editor, mod));

  // Mark solved button
  if (!alreadySolved) {
    document.getElementById('ch-solved-btn')?.addEventListener('click', () => markSolved(ch));
  }

  // Clear output
  document.getElementById('ch-clear-btn')?.addEventListener('click', () => {
    document.getElementById('ch-output-wrap').hidden = true;
    document.getElementById('ch-solved-btn') && (document.getElementById('ch-solved-btn').hidden = true);
  });
}

let _solutionViewed = false;

// ── Run code via Piston API ───────────────────────────────────
async function runCode(ch, editor, mod) {
  const code    = editor.value.trim();
  const runBtn  = document.getElementById('ch-run-btn');
  const outWrap = document.getElementById('ch-output-wrap');
  const outEl   = document.getElementById('ch-output');

  if (!code) {
    showToast('Write some code first!', 'info');
    return;
  }

  runBtn.disabled    = true;
  runBtn.textContent = '⏳ Running…';
  outWrap.hidden     = false;
  outEl.textContent  = 'Running your code…';
  outEl.className    = 'ch-output';

  try {
    const resp = await fetch(PISTON_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: CPP_LANG,
        version:  CPP_VER,
        files:    [{ content: code }],
        stdin:    '',
      }),
    });

    if (!resp.ok) throw new Error(`API error ${resp.status}`);

    const data = await resp.json();
    const run  = data.run ?? {};
    const compile = data.compile ?? {};

    if (compile.code !== 0 && compile.stderr) {
      outEl.textContent = '⚠ Compile error:\n\n' + compile.stderr;
      outEl.classList.add('ch-output--error');
    } else if (run.stderr) {
      outEl.textContent = (run.stdout ? run.stdout + '\n\n' : '') + '⚠ Runtime error:\n' + run.stderr;
      outEl.classList.add('ch-output--error');
    } else {
      const output = run.stdout ?? '(no output)';
      outEl.textContent = output;
      outEl.classList.add('ch-output--success');

      // Show "Mark as Solved" after a successful run
      const state = getState();
      if (!state.challenges[ch.id]?.solved) {
        const solvedBtn = document.getElementById('ch-solved-btn');
        if (solvedBtn) solvedBtn.hidden = false;
      }
    }

  } catch (err) {
    outEl.textContent = '⚠ Could not reach the execution server.\n\nCheck your internet connection and try again.\n\n' + err.message;
    outEl.classList.add('ch-output--error');
  } finally {
    runBtn.disabled    = false;
    runBtn.textContent = '▶ Run Code';
  }
}

// ── Mark challenge as solved ──────────────────────────────────
function markSolved(ch) {
  stopTimer();
  const btn = document.getElementById('ch-solved-btn');
  if (btn) {
    btn.disabled    = true;
    btn.textContent = '✓ Solved!';
  }

  recordChallengeSolved(ch.id, _elapsed, false, _solutionViewed);

  showToast(
    _solutionViewed ? `Challenge complete (solution viewed — no XP)` : `⚡ +${ch.xp} XP — Challenge solved!`,
    _solutionViewed ? 'info' : 'xp'
  );

  // Add solved badge to problem tab
  const promptEl = document.querySelector('.ch-prompt');
  if (promptEl) {
    const badge = document.createElement('div');
    badge.className = 'ch-solved-badge';
    badge.textContent = '✓ Solved! ' + (!_solutionViewed ? `+${ch.xp} XP earned` : 'Solution viewed');
    promptEl.insertAdjacentElement('afterend', badge);
  }
}

// ── Hints HTML ────────────────────────────────────────────────
function buildHintsHTML(ch) {
  if (!ch.hints || ch.hints.length === 0) {
    return `<p style="color:var(--text-muted);padding:var(--sp-4)">No hints available for this challenge. Try to work through it yourself first!</p>`;
  }
  return ch.hints.map((hint, i) => `
    <details class="ch-hint">
      <summary class="ch-hint__title">💡 Hint ${i + 1}</summary>
      <p class="ch-hint__body">${escHtml(hint)}</p>
    </details>
  `).join('');
}

const DEFAULT_STARTER = `#include <iostream>
using namespace std;

int main() {
    // Your code here

    return 0;
}`;

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
