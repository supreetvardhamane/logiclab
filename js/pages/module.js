/**
 * LogicLab — Module Overview Page (js/pages/module.js)
 *
 * Route: /module/:id   (served by learn.html)
 *
 * Shows:
 *   • Module hero banner (phase, title, estimated time, XP, progress)
 *   • Continue button → resumes last unread article
 *   • Article list with read/active/locked state
 *   • Challenge list (locked until module articles done for theory-only modules)
 *   • Quiz card (locked until all articles read)
 */

import { getState }               from '../progress.js';
import { getModule, getPhase, moduleMaxXP } from '../../data/modules.js';
import { navigate }               from '../router.js';

// ── PHASE COLORS ──────────────────────────────────────────────────────────────
const PHASE_COLORS = {
  1: '#6C47FF', 2: '#3b82f6', 3: '#06b6d4',
  4: '#22c55e', 5: '#f59e0b', 6: '#ef4444', 7: '#ec4899',
};

// ── DIFFICULTY BADGE ──────────────────────────────────────────────────────────
function diffBadge(difficulty) {
  const classes = { easy: 'badge--easy', medium: 'badge--medium', hard: 'badge--hard' };
  return `<span class="badge ${classes[difficulty] || ''}" style="margin-right:var(--sp-2)">${difficulty}</span>`;
}

// ── ARTICLE ROW ───────────────────────────────────────────────────────────────
function articleRow(mod, article, modProgress, isActive) {
  const done   = !!modProgress?.articles?.[String(article.n)]?.read;
  const color  = PHASE_COLORS[mod.phase] || 'var(--brand-purple)';

  let icon, statusStyle;
  if (done) {
    icon = `<span style="color:var(--green);font-size:1.1rem">✓</span>`;
    statusStyle = 'opacity:.75';
  } else if (isActive) {
    icon = `<span style="color:${color};font-size:1.1rem">▶</span>`;
    statusStyle = '';
  } else {
    icon = `<span style="color:var(--text-muted);font-size:.9rem">○</span>`;
    statusStyle = 'color:var(--text-muted)';
  }

  return `
    <a href="#/module/${mod.id}/article/${article.n}"
       style="
         display:flex; align-items:center; gap:var(--sp-3);
         padding:var(--sp-3) var(--sp-4);
         border-bottom:1px solid var(--border);
         text-decoration:none; color:inherit; transition:background .15s;
         ${statusStyle}
       "
       onmouseenter="this.style.background='var(--surface-2)'"
       onmouseleave="this.style.background=''"
    >
      <span style="width:1.5rem;text-align:center;flex-shrink:0">${icon}</span>
      <span style="flex:1">
        <span style="font-size:var(--text-xs);color:${color};font-weight:700;margin-right:var(--sp-2)">${mod.id}.${article.n}</span>
        <span style="font-weight:${done || isActive ? '600' : '400'}">${article.title}</span>
        ${article.subtitle ? `<span class="text-xs" style="display:block;color:var(--text-muted);margin-top:1px">${article.subtitle}</span>` : ''}
      </span>
      <span style="font-size:var(--text-xs);color:var(--text-muted);flex-shrink:0">+10 XP</span>
    </a>`;
}

// ── CHALLENGE ROW ─────────────────────────────────────────────────────────────
function challengeRow(challenge, solved, locked) {
  const icon = solved ? `<span style="color:var(--green)">✓</span>`
             : locked  ? `<span style="opacity:.4">🔒</span>`
             : `<span style="color:var(--orange)">▶</span>`;

  const content = `
    <span style="width:1.5rem;text-align:center;flex-shrink:0">${icon}</span>
    <span style="flex:1;${locked ? 'opacity:.5' : ''}">
      <span style="font-weight:${solved ? '400' : '600'}">${challenge.title}</span>
    </span>
    ${diffBadge(challenge.difficulty)}
    <span style="font-size:var(--text-xs);color:var(--text-muted);flex-shrink:0">+${challenge.xp} XP</span>`;

  if (locked) {
    return `<div style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3) var(--sp-4);border-bottom:1px solid var(--border)">${content}</div>`;
  }

  return `
    <a href="#/challenge/${challenge.id}"
       style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3) var(--sp-4);border-bottom:1px solid var(--border);text-decoration:none;color:inherit;transition:background .15s"
       onmouseenter="this.style.background='var(--surface-2)'"
       onmouseleave="this.style.background=''"
    >${content}</a>`;
}

// ── MAIN RENDER ───────────────────────────────────────────────────────────────
export async function render(params, app) {
  const moduleId = Number(params.id);
  const mod      = getModule(moduleId);

  if (!mod) {
    app.innerHTML = `
      <div style="padding:var(--sp-16);text-align:center">
        <h2>Module not found</h2>
        <p style="color:var(--text-muted);margin-top:var(--sp-2)">Module ${params.id} does not exist.</p>
        <a href="#/" class="btn btn-primary" style="display:inline-flex;margin-top:var(--sp-6)">← Back to Dashboard</a>
      </div>`;
    return;
  }

  const state     = getState();
  const modProg   = state.modules[String(moduleId)] || {};
  const phase     = getPhase(mod.phase);
  const color     = PHASE_COLORS[mod.phase] || 'var(--brand-purple)';
  const maxXP     = moduleMaxXP(mod);

  // Progress calculation
  const readCount  = mod.articles.filter(a => !!modProg?.articles?.[String(a.n)]?.read).length;
  const totalArt   = mod.articles.length;
  const pct        = totalArt > 0 ? Math.round((readCount / totalArt) * 100) : 0;
  const allRead    = readCount === totalArt;
  const quizPassed = !!modProg?.quiz?.passed;

  // Find the next article to read (first unread)
  const nextArticle = mod.articles.find(a => !modProg?.articles?.[String(a.n)]?.read);
  const continueN   = nextArticle ? nextArticle.n : mod.articles[0]?.n;

  // Challenge unlock: all articles read (or no articles for this module)
  const challengesUnlocked = allRead || totalArt === 0;

  app.innerHTML = `
    <div class="page-content" style="padding-bottom:var(--sp-16)">

      <!-- Back link -->
      <div style="padding:var(--sp-4) 0 0">
        <a href="#/roadmap" style="font-size:var(--text-sm);color:var(--text-muted);text-decoration:none;display:inline-flex;align-items:center;gap:var(--sp-1)">
          ← Back to Roadmap
        </a>
      </div>

      <!-- Hero Banner -->
      <div class="card" style="
        background: linear-gradient(135deg, ${color}, ${color}cc);
        color: white;
        margin-top: var(--sp-4);
        padding: var(--sp-6);
        border: none;
      ">
        <div style="font-size:var(--text-xs);font-weight:700;letter-spacing:2px;opacity:.8;text-transform:uppercase;margin-bottom:var(--sp-1)">
          ${phase ? phase.label : 'Phase ' + mod.phase} · Module ${mod.id}
        </div>
        <h1 style="font-size:1.6rem;margin-bottom:var(--sp-1);color:white">${mod.title}</h1>
        ${mod.theoryOnly ? `<span style="background:rgba(255,255,255,.2);border-radius:12px;padding:2px 10px;font-size:var(--text-xs);font-weight:700">Theory Only</span>` : ''}

        <!-- Meta row -->
        <div style="display:flex;gap:var(--sp-6);margin-top:var(--sp-4);font-size:var(--text-sm);opacity:.9;flex-wrap:wrap">
          <span>⏱ ~${mod.estimatedMinutes} min</span>
          <span>⚡ up to ${maxXP} XP</span>
          <span>📄 ${totalArt} article${totalArt !== 1 ? 's' : ''}</span>
          ${mod.challenges.length > 0 ? `<span>💻 ${mod.challenges.length} challenge${mod.challenges.length !== 1 ? 's' : ''}</span>` : ''}
        </div>

        <!-- Progress bar -->
        <div style="margin-top:var(--sp-5)">
          <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);opacity:.85;margin-bottom:var(--sp-2)">
            <span>Progress</span>
            <span>${pct}% · ${readCount}/${totalArt} articles</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar__fill" style="width:${pct}%;background:rgba(255,255,255,.9)"></div>
          </div>
        </div>

        <!-- Continue button -->
        ${continueN ? `
          <a href="#/module/${mod.id}/article/${continueN}"
             class="btn"
             style="
               display:inline-flex;margin-top:var(--sp-5);
               background:white;color:${color};font-weight:700;
               padding:var(--sp-2) var(--sp-5);
             ">
            ${allRead && quizPassed ? '📖 Review Articles' : readCount > 0 ? '▶ Continue' : '▶ Start Learning'}
          </a>` : ''}
      </div>

      <!-- Articles Section -->
      <div style="margin-top:var(--sp-8)">
        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:var(--sp-3)">Articles</h2>
        <div class="card" style="overflow:hidden;padding:0">
          ${mod.articles.map((a, i) => {
            const isNextToRead = a.n === (nextArticle?.n ?? -1);
            return articleRow(mod, a, modProg, isNextToRead);
          }).join('')}
          ${totalArt === 0 ? `<div style="padding:var(--sp-4);color:var(--text-muted)">No articles in this module.</div>` : ''}
        </div>
      </div>

      <!-- Challenges Section -->
      ${mod.challenges.length > 0 ? `
        <div style="margin-top:var(--sp-8)">
          <div style="display:flex;align-items:center;gap:var(--sp-3);margin-bottom:var(--sp-3)">
            <h2 style="font-size:1.1rem;font-weight:700">Coding Challenges</h2>
            ${!challengesUnlocked ? `<span class="badge badge--new" style="font-size:10px">Unlock after all articles</span>` : ''}
          </div>
          <div class="card" style="overflow:hidden;padding:0">
            ${mod.challenges.map(ch => {
              const solved = !!state.challenges[ch.id]?.solved;
              const locked = !challengesUnlocked && !solved;
              return challengeRow(ch, solved, locked);
            }).join('')}
          </div>
        </div>` : ''}

      <!-- Quiz Section -->
      <div style="margin-top:var(--sp-8)">
        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:var(--sp-3)">Module Quiz</h2>
        <div class="card" style="padding:var(--sp-5)">
          ${allRead || quizPassed ? `
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--sp-4)">
              <div>
                <div style="font-weight:700;margin-bottom:var(--sp-1)">
                  ${quizPassed
                    ? `<span style="color:var(--green)">✓ Passed — ${modProg.quiz.score}/${modProg.quiz.total}</span>`
                    : `${mod.quiz.count} MCQs — Pass ${mod.quiz.passMark}/${mod.quiz.count} to unlock next module`}
                </div>
                <div style="font-size:var(--text-sm);color:var(--text-muted)">
                  ${quizPassed
                    ? `Attempts: ${modProg.quiz.attempts} · +50 XP earned`
                    : `+50 XP first attempt · +25 XP retry`}
                </div>
              </div>
              <a href="#/quiz/${mod.id}" class="btn btn-primary">
                ${quizPassed ? '📋 Retake Quiz' : '🎯 Take Quiz'}
              </a>
            </div>` : `
            <div style="display:flex;align-items:center;gap:var(--sp-4)">
              <span style="font-size:1.5rem;opacity:.4">🔒</span>
              <div>
                <div style="font-weight:600;color:var(--text-muted)">${mod.quiz.count} MCQs — Read all articles to unlock</div>
                <div style="font-size:var(--text-sm);color:var(--text-muted)">+50 XP first attempt · +25 XP retry</div>
              </div>
            </div>`}
        </div>
      </div>

    </div>`;
}
