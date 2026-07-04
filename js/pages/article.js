/**
 * LogicLab — Article Reader Page (js/pages/article.js)
 *
 * Route: /module/:id/article/:n   (served by learn.html)
 *
 * Features:
 *   • Left sidebar (articles + challenges + quiz for the module)
 *   • Breadcrumb + article title + read-time + bookmark button
 *   • Article body rendered by render.js (Prism.js code blocks)
 *   • Quick Check MCQs injected inline — cannot skip past one
 *   • Reading progress bar (in learn.html fixed element)
 *   • Mark complete button → addXP(10) + markArticleRead + navigate next
 *   • Prev / Next article navigation
 */

import { getState, markArticleRead, addBookmark, removeBookmark } from '../progress.js';
import { getModule, getPhase }   from '../../data/modules.js';
import { renderArticle, initReadingProgress, destroyReadingProgress, showToast } from '../render.js';
import { navigate }              from '../router.js';

// ── PHASE COLORS ──────────────────────────────────────────────────────────────
const PHASE_COLORS = {
  1: '#6C47FF', 2: '#3b82f6', 3: '#06b6d4',
  4: '#22c55e', 5: '#f59e0b', 6: '#ef4444', 7: '#ec4899',
};

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function buildSidebar(mod, modProg, activeN, challenges, state) {
  const color = PHASE_COLORS[mod.phase] || 'var(--brand-purple)';

  const articleItems = mod.articles.map(a => {
    const done   = !!modProg?.articles?.[String(a.n)]?.read;
    const active = a.n === activeN;
    let icon = done ? `<span style="color:var(--green)">✓</span>`
             : active ? `<span style="color:${color}">▶</span>`
             : `<span style="color:var(--text-muted)">○</span>`;
    return `
      <a href="#/module/${mod.id}/article/${a.n}"
         style="
           display:flex;align-items:center;gap:var(--sp-2);
           padding:var(--sp-2) var(--sp-3);border-radius:6px;
           text-decoration:none;color:${active ? color : 'var(--text)'};
           font-weight:${active ? '700' : '400'};
           font-size:var(--text-sm);
           background:${active ? 'var(--purple-tint)' : 'transparent'};
           transition:background .15s;
           margin-bottom:2px;
         "
         onmouseenter="if(!this.href.includes('/article/${a.n}') || !${active})this.style.background='var(--surface-2)'"
         onmouseleave="this.style.background='${active ? 'var(--purple-tint)' : 'transparent'}'"
      >
        <span style="width:1rem;flex-shrink:0;text-align:center">${icon}</span>
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${a.title}</span>
      </a>`;
  }).join('');

  const allRead = mod.articles.length > 0 &&
    mod.articles.every(a => !!modProg?.articles?.[String(a.n)]?.read);

  const challengeItems = challenges.map(ch => {
    const solved = !!state.challenges[ch.id]?.solved;
    const locked = !allRead && !solved;
    if (locked) {
      return `<div style="display:flex;align-items:center;gap:var(--sp-2);padding:var(--sp-2) var(--sp-3);color:var(--text-muted);font-size:var(--text-sm);opacity:.5">
        <span>🔒</span><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ch.title}</span>
      </div>`;
    }
    return `
      <a href="#/challenge/${ch.id}"
         style="display:flex;align-items:center;gap:var(--sp-2);padding:var(--sp-2) var(--sp-3);border-radius:6px;text-decoration:none;color:var(--text);font-size:var(--text-sm);transition:background .15s;"
         onmouseenter="this.style.background='var(--surface-2)'"
         onmouseleave="this.style.background=''"
      >
        <span style="color:${solved ? 'var(--green)' : 'var(--orange)'};">${solved ? '✓' : '▶'}</span>
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ch.title}</span>
      </a>`;
  }).join('');

  const quizLocked = !allRead && !modProg?.quiz?.passed;

  return `
    <nav class="article-sidebar" style="
      width:220px;flex-shrink:0;
      border-right:1px solid var(--border);
      padding:var(--sp-5) var(--sp-3);
      overflow-y:auto;
      position:sticky;top:0;
      max-height:calc(100vh - 60px);
    ">
      <div style="font-size:var(--text-xs);font-weight:700;color:${color};letter-spacing:1.5px;text-transform:uppercase;margin-bottom:var(--sp-2)">
        Module ${mod.id}
      </div>
      <div style="font-size:var(--text-sm);font-weight:700;color:var(--text);margin-bottom:var(--sp-4);line-height:1.3">
        ${mod.title}
      </div>

      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:var(--sp-2)">Articles</div>
      ${articleItems}

      ${challenges.length > 0 ? `
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-top:var(--sp-5);margin-bottom:var(--sp-2)">Challenges</div>
        ${challengeItems}` : ''}

      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-top:var(--sp-5);margin-bottom:var(--sp-2)">Quiz</div>
      ${quizLocked
        ? `<div style="display:flex;align-items:center;gap:var(--sp-2);padding:var(--sp-2) var(--sp-3);color:var(--text-muted);font-size:var(--text-sm);opacity:.5">
            <span>🔒</span><span>${mod.quiz.count} MCQs</span>
           </div>`
        : `<a href="#/quiz/${mod.id}" style="display:flex;align-items:center;gap:var(--sp-2);padding:var(--sp-2) var(--sp-3);border-radius:6px;text-decoration:none;color:var(--text);font-size:var(--text-sm);transition:background .15s"
             onmouseenter="this.style.background='var(--surface-2)'" onmouseleave="this.style.background=''">
            <span>🎯</span><span>${mod.quiz.count} MCQs${modProg?.quiz?.passed ? ' ✓' : ''}</span>
           </a>`}
    </nav>`;
}

// ── MAIN RENDER ───────────────────────────────────────────────────────────────
export async function render(params, app) {
  const moduleId  = Number(params.id);
  const articleN  = Number(params.n);
  const mod       = getModule(moduleId);

  if (!mod) {
    app.innerHTML = `<div style="padding:var(--sp-8)"><h2>Module not found</h2></div>`;
    return;
  }

  const articleMeta = mod.articles.find(a => a.n === articleN);
  if (!articleMeta) {
    app.innerHTML = `<div style="padding:var(--sp-8)"><h2>Article not found</h2><a href="#/module/${moduleId}" class="btn btn-secondary" style="margin-top:var(--sp-4)">← Back to Module</a></div>`;
    return;
  }

  // Dynamically import the article content
  let articleData;
  try {
    const mStr = String(moduleId).padStart(2, '0');
    const nStr = String(articleN).padStart(2, '0');
    const mod_  = await import(`../../data/content/m${mStr}-a${nStr}.js`);
    articleData = mod_.default;
  } catch (e) {
    app.innerHTML = `
      <div style="padding:var(--sp-8);text-align:center">
        <h2>Content not yet available</h2>
        <p style="color:var(--text-muted);margin-top:var(--sp-2)">
          Article ${moduleId}.${articleN} content is being written. Check back soon!
        </p>
        <a href="#/module/${moduleId}" class="btn btn-secondary" style="display:inline-flex;margin-top:var(--sp-6)">
          ← Back to Module
        </a>
      </div>`;
    return;
  }

  const state    = getState();
  const modProg  = state.modules[String(moduleId)] || {};
  const isRead   = !!modProg?.articles?.[String(articleN)]?.read;
  const color    = PHASE_COLORS[mod.phase] || 'var(--brand-purple)';
  const phase    = getPhase(mod.phase);

  // Bookmark state
  const bmId     = `m${moduleId}-a${articleN}`;
  const bookmarked = state.bookmarks.some(b => b.id === bmId);

  // Prev / Next
  const idx      = mod.articles.findIndex(a => a.n === articleN);
  const prevArt  = idx > 0 ? mod.articles[idx - 1] : null;
  const nextArt  = idx < mod.articles.length - 1 ? mod.articles[idx + 1] : null;

  // ── Build page shell ──────────────────────────────────────────────────────
  app.innerHTML = '';

  const layout = document.createElement('div');
  layout.style.cssText = 'display:flex;min-height:calc(100vh - 60px)';

  // Sidebar
  layout.innerHTML = buildSidebar(mod, modProg, articleN, mod.challenges, state);

  // Main content area
  const main = document.createElement('main');
  main.style.cssText = 'flex:1;min-width:0;padding:var(--sp-6) var(--sp-8);max-width:780px;margin:0 auto';

  // Breadcrumb
  const crumb = document.createElement('div');
  crumb.style.cssText = 'font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--sp-4)';
  crumb.innerHTML = `
    <a href="#/roadmap" style="color:var(--text-muted);text-decoration:none">Roadmap</a>
    <span style="margin:0 var(--sp-2)">›</span>
    <a href="#/module/${moduleId}" style="color:var(--text-muted);text-decoration:none">Module ${moduleId}</a>
    <span style="margin:0 var(--sp-2)">›</span>
    <span>${articleMeta.title}</span>`;

  // Title row
  const titleRow = document.createElement('div');
  titleRow.style.cssText = 'display:flex;align-items:flex-start;justify-content:space-between;gap:var(--sp-4);margin-bottom:var(--sp-2)';

  const titleBlock = document.createElement('div');
  titleBlock.innerHTML = `
    <h1 style="font-size:1.7rem;line-height:1.25;color:var(--text)">${articleData.title}</h1>
    ${articleMeta.subtitle ? `<p style="color:var(--text-muted);margin-top:var(--sp-1)">${articleMeta.subtitle}</p>` : ''}`;

  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'btn btn-ghost btn-icon';
  bookmarkBtn.style.cssText = 'flex-shrink:0;margin-top:4px;font-size:1.2rem';
  bookmarkBtn.setAttribute('aria-label', bookmarked ? 'Remove bookmark' : 'Add bookmark');
  bookmarkBtn.textContent = bookmarked ? '🔖' : '🏷️';
  bookmarkBtn.title = bookmarked ? 'Remove from Review' : 'Add to Review';

  let bmState = bookmarked;
  bookmarkBtn.addEventListener('click', () => {
    if (bmState) {
      removeBookmark(bmId);
      bmState = false;
      bookmarkBtn.textContent = '🏷️';
      bookmarkBtn.title = 'Add to Review';
      showToast('Removed from Review queue', 'info');
    } else {
      addBookmark(bmId, moduleId, articleN, articleData.title);
      bmState = true;
      bookmarkBtn.textContent = '🔖';
      bookmarkBtn.title = 'Remove from Review';
      showToast('✅ Added to Review queue', 'success');
    }
  });

  titleRow.appendChild(titleBlock);
  titleRow.appendChild(bookmarkBtn);

  // Meta row (read time + XP)
  const meta = document.createElement('div');
  meta.style.cssText = 'display:flex;align-items:center;gap:var(--sp-4);color:var(--text-muted);font-size:var(--text-sm);margin-bottom:var(--sp-6);padding-bottom:var(--sp-4);border-bottom:1px solid var(--border)';
  meta.innerHTML = `
    <span>⏱ ${articleData.readMinutes || 10} min read</span>
    <span>⚡ +10 XP on complete</span>
    ${isRead ? `<span style="color:var(--green);font-weight:700">✓ Completed</span>` : ''}`;

  // Article content container
  const articleBody = document.createElement('div');
  articleBody.id = 'article-body';

  main.appendChild(crumb);
  main.appendChild(titleRow);
  main.appendChild(meta);
  main.appendChild(articleBody);

  layout.appendChild(main);
  app.appendChild(layout);

  // ── Render article blocks ─────────────────────────────────────────────────
  const { qcStates } = renderArticle(articleData, articleBody);

  // ── Reading progress bar ──────────────────────────────────────────────────
  initReadingProgress(articleBody);

  // ── Track scroll-past QC ─────────────────────────────────────────────────
  // We track whether each QC has been answered
  // QCs dispatch 'qc-answered' event bubbled to articleBody

  // ── Navigation footer ─────────────────────────────────────────────────────
  const footer = document.createElement('div');
  footer.style.cssText = `
    margin-top: var(--sp-10);
    padding-top: var(--sp-6);
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-4);
    flex-wrap: wrap;
  `;

  const prevBtn = prevArt
    ? `<a href="#/module/${moduleId}/article/${prevArt.n}" class="btn btn-secondary">
         ← ${prevArt.title}
       </a>`
    : `<a href="#/module/${moduleId}" class="btn btn-secondary">← Back to Module</a>`;

  const nextBtn = nextArt
    ? `<a href="#/module/${moduleId}/article/${nextArt.n}" class="btn btn-secondary">
         ${nextArt.title} →
       </a>`
    : (mod.challenges.length > 0
        ? `<a href="#/challenge/${mod.challenges[0].id}" class="btn btn-secondary">First Challenge →</a>`
        : `<a href="#/quiz/${moduleId}" class="btn btn-secondary">Take Quiz →</a>`);

  footer.innerHTML = `
    <div>${prevBtn}</div>
    <button id="complete-btn" class="btn ${isRead ? 'btn-secondary' : 'btn-primary'}" style="font-size:var(--text-sm)">
      ${isRead ? '✓ Already completed' : '🏆 Complete & earn +10 XP'}
    </button>
    <div>${nextBtn}</div>`;

  main.appendChild(footer);

  // ── Complete button logic ─────────────────────────────────────────────────
  const completeBtn = document.getElementById('complete-btn');
  if (completeBtn && !isRead) {
    completeBtn.addEventListener('click', () => {
      markArticleRead(moduleId, articleN);
      completeBtn.textContent = '✓ Completed!';
      completeBtn.classList.remove('btn-primary');
      completeBtn.classList.add('btn-secondary');
      completeBtn.disabled = true;

      showToast('⚡ +10 XP — Article completed!', 'xp');

      // Update meta row
      meta.innerHTML += `<span style="color:var(--green);font-weight:700">✓ Completed</span>`;

      // Auto-navigate to next article after a short delay
      if (nextArt) {
        setTimeout(() => {
          navigate(`/module/${moduleId}/article/${nextArt.n}`);
        }, 1200);
      }
    });
  }

  // ── Mobile sidebar toggle (hamburger via navbar) ──────────────────────────
  // The sidebar on mobile collapses — handled via CSS media query
}
