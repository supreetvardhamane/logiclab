// js/pages/dashboard.js — Main dashboard: XP, streak, continue, review queue, badges, stats
import { getState, getDueCards } from '../progress.js';
import { MODULES, PHASES } from '../../data/modules.js';

const LEVEL_THRESHOLDS = [
  { name: 'Beginner',  min: 0,    max: 500  },
  { name: 'Bronze',    min: 500,  max: 1500 },
  { name: 'Silver',    min: 1500, max: 3500 },
  { name: 'Gold',      min: 3500, max: 7000 },
  { name: 'Platinum',  min: 7000, max: 10000 },
];

const BADGE_META = {
  'hello-world':      { label: 'Hello World',      icon: '👋', desc: 'Pass Module 2 quiz'                      },
  'variable-wizard':  { label: 'Variable Wizard',   icon: '🔮', desc: 'Pass Module 3 quiz'                      },
  'logic-gate':       { label: 'Logic Gate',         icon: '🔀', desc: 'Solve all conditional challenges'        },
  'loop-hero':        { label: 'Loop Hero',           icon: '🔁', desc: 'Solve all loop challenges'              },
  'pointer-wrangler': { label: 'Pointer Wrangler',   icon: '📍', desc: 'Pass Module 9 quiz'                     },
  'oop-architect':    { label: 'OOP Architect',      icon: '🏗️', desc: 'Pass Module 12 quiz'                    },
  'polymorphist':     { label: 'Polymorphist',        icon: '🦋', desc: 'Pass Module 15 quiz'                   },
  'bug-slayer':       { label: 'Bug Slayer',          icon: '🐛', desc: '3 challenges solved on first try'      },
  'streak-fire':      { label: 'Streak Fire',         icon: '🔥', desc: '7-day streak'                          },
  'perfect-score':    { label: 'Perfect Score',       icon: '💯', desc: 'Score 100% on any quiz (first try)'   },
  'speed-coder':      { label: 'Speed Coder',         icon: '⚡', desc: 'Solve a challenge in under 5 minutes' },
  'bookworm':         { label: 'Bookworm',            icon: '📚', desc: '10 bookmarks saved'                   },
  'course-complete':  { label: 'Course Complete',     icon: '🎓', desc: 'Pass all 19 module quizzes'           },
};

export async function render(params, app) {
  const state    = getState();
  const dueCards = getDueCards();
  const dueCount = dueCards.length;

  // ── XP / level data ──────────────────────────────────────────
  const xp          = state.xp ?? 0;
  const level       = state.level ?? 'Beginner';
  const levelData   = LEVEL_THRESHOLDS.find(l => l.name === level) ?? LEVEL_THRESHOLDS[0];
  const nextLevel   = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.indexOf(levelData) + 1];
  const xpInLevel   = xp - levelData.min;
  const xpNeeded    = nextLevel ? nextLevel.min - levelData.min : levelData.max - levelData.min;
  const xpPct       = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  const xpToNext    = nextLevel ? nextLevel.min - xp : 0;

  // ── Streak ───────────────────────────────────────────────────
  const streak = state.streak?.count ?? 1;

  // ── Continue card: last visited or first unfinished ─────────
  let continueTarget = null;
  if (state.lastVisited) {
    const lv = state.lastVisited;
    continueTarget = { moduleId: lv.moduleId, articleId: lv.articleId, type: lv.type };
  } else {
    // find first unlocked module with unread articles
    for (const mod of MODULES) {
      const mp = state.modules[String(mod.id)];
      if (!mp?.unlocked) break;
      const readCount = Object.keys(mp.articles ?? {}).filter(k => mp.articles[k]?.read).length;
      if (readCount < mod.articles.length) {
        continueTarget = { moduleId: mod.id, articleId: readCount + 1, type: 'article' };
        break;
      }
    }
  }
  const continueMod = continueTarget
    ? MODULES.find(m => String(m.id) === String(continueTarget.moduleId))
    : null;

  // ── Today's goal ─────────────────────────────────────────────
  const todayDate   = new Date().toISOString().slice(0, 10);
  const todayXP     = state.dailyXP?.date === todayDate ? (state.dailyXP.earned ?? 0) : 0;
  const dailyGoal   = 50;  // XP to earn daily for bonus
  const todayDone   = todayXP >= dailyGoal;
  const todayPct    = Math.min(100, Math.round((todayXP / dailyGoal) * 100));

  // ── Stats ────────────────────────────────────────────────────
  const stats = state.stats ?? {};
  const accuracyPct = stats.quizAccuracyCount > 0
    ? Math.round(stats.quizAccuracySum / stats.quizAccuracyCount)
    : 0;

  // ── Phase progress ────────────────────────────────────────────
  const phaseProgress = PHASES.map(phase => {
    const mods       = phase.modules;
    const completed  = mods.filter(id => state.modules[String(id)]?.quiz?.passed).length;
    const pct        = Math.round((completed / mods.length) * 100);
    return { ...phase, completed, total: mods.length, pct };
  });

  // ── Recent / all badges ───────────────────────────────────────
  const earned     = state.badges ?? [];
  const allBadgeIds = Object.keys(BADGE_META);
  const recentBadges = allBadgeIds.slice(0, 6); // show first 6 slots, locked/unlocked

  // ── Greeting ─────────────────────────────────────────────────
  const hour    = new Date().getHours();
  const timeGreet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // ── Render ───────────────────────────────────────────────────
  const continueCardHTML = continueMod ? `
    <div class="dash-card dash-card--continue">
      <div class="dash-card__icon">▶</div>
      <div class="dash-card__body">
        <p class="dash-card__label">CONTINUE</p>
        <h3 class="dash-card__title">${escHtml(continueMod.title)}</h3>
        <p class="dash-card__sub">
          Article ${continueTarget.articleId ?? '?'} of ${continueMod.articles.length}
        </p>
      </div>
      <a href="learn.html#/module/${continueMod.id}/article/${continueTarget.articleId ?? 1}"
         class="btn btn-primary dash-card__cta">Resume →</a>
    </div>
  ` : `
    <div class="dash-card dash-card--continue">
      <div class="dash-card__icon">🚀</div>
      <div class="dash-card__body">
        <p class="dash-card__label">START</p>
        <h3 class="dash-card__title">Module 1 — CS Fundamentals</h3>
        <p class="dash-card__sub">Begin your C++ journey</p>
      </div>
      <a href="learn.html#/module/1/article/1" class="btn btn-primary dash-card__cta">Start →</a>
    </div>
  `;

  const reviewCardHTML = `
    <div class="dash-card dash-card--review${dueCount === 0 ? ' dash-card--muted' : ''}">
      <div class="dash-card__icon">🃏</div>
      <div class="dash-card__body">
        <p class="dash-card__label">REVIEW DUE</p>
        <h3 class="dash-card__title">${dueCount > 0 ? `${dueCount} card${dueCount !== 1 ? 's' : ''} due` : 'All caught up!'}</h3>
        <p class="dash-card__sub">${dueCount > 0 ? 'Spaced repetition session' : 'No cards due today'}</p>
      </div>
      ${dueCount > 0
        ? `<a href="review.html" class="btn btn-secondary dash-card__cta">Start Review</a>`
        : `<span class="dash-card__cta" style="color:var(--green);font-weight:600">✓ Done</span>`
      }
    </div>
  `;

  const todayCardHTML = `
    <div class="dash-card dash-card--today${todayDone ? ' dash-card--done' : ''}">
      <div class="dash-card__icon">🎯</div>
      <div class="dash-card__body">
        <p class="dash-card__label">TODAY</p>
        <h3 class="dash-card__title">${todayXP} / ${dailyGoal} XP</h3>
        <div class="progress-bar dash-today-bar" style="margin-top:var(--sp-1)">
          <div class="progress-bar__fill" style="width:${todayPct}%;background:var(--orange)"></div>
        </div>
        <p class="dash-card__sub">${todayDone ? '🎉 Bonus earned!' : `+20 XP streak bonus if you reach ${dailyGoal} XP`}</p>
      </div>
    </div>
  `;

  const badgesHTML = recentBadges.map(id => {
    const meta    = BADGE_META[id] ?? { label: id, icon: '?', desc: '' };
    const isEarned = earned.includes(id);
    return `
      <div class="dash-badge${isEarned ? ' dash-badge--earned' : ' dash-badge--locked'}" title="${escHtml(meta.desc)}">
        <span class="dash-badge__icon">${isEarned ? meta.icon : '🔒'}</span>
        <span class="dash-badge__label">${escHtml(meta.label)}</span>
      </div>
    `;
  }).join('');

  const phaseHTML = phaseProgress.map(ph => `
    <div class="dash-phase-row">
      <span class="dash-phase-label" style="color:${ph.color}">${escHtml(ph.title)}</span>
      <div class="progress-bar dash-phase-bar">
        <div class="progress-bar__fill" style="width:${ph.pct}%;background:${ph.color}"></div>
      </div>
      <span class="dash-phase-frac">${ph.completed} / ${ph.total}</span>
    </div>
  `).join('');

  app.innerHTML = `
    <div class="dash-page">

      <!-- Greeting + streak -->
      <div class="dash-greeting">
        <div>
          <h1 class="dash-greeting__text">${timeGreet}! 🔥 Day ${streak} streak</h1>
          <p class="dash-greeting__sub">Keep the momentum going.</p>
        </div>
      </div>

      <!-- XP bar -->
      <div class="dash-xp-card">
        <div class="dash-xp-top">
          <span class="dash-xp-level">${escHtml(level)}</span>
          <span class="dash-xp-total">${xp.toLocaleString()} XP</span>
          ${nextLevel ? `<span class="dash-xp-next">${xpToNext.toLocaleString()} to ${escHtml(nextLevel.name)}</span>` : '<span class="dash-xp-next">Max level!</span>'}
        </div>
        <div class="progress-bar dash-xp-bar" style="margin-top:var(--sp-2)">
          <div class="progress-bar__fill" style="width:${xpPct}%"></div>
        </div>
        <div class="dash-xp-range">
          <span>${levelData.min.toLocaleString()}</span>
          <span>${nextLevel ? nextLevel.min.toLocaleString() : '∞'}</span>
        </div>
      </div>

      <!-- CTA cards -->
      <div class="dash-cards">
        ${continueCardHTML}
        ${reviewCardHTML}
        ${todayCardHTML}
      </div>

      <!-- Recent badges -->
      <section class="dash-section">
        <div class="dash-section__head">
          <h2 class="dash-section__title">Badges</h2>
          <a href="index.html#/profile" class="dash-section__link">View All →</a>
        </div>
        <div class="dash-badges">${badgesHTML}</div>
      </section>

      <!-- Quick stats -->
      <section class="dash-section">
        <h2 class="dash-section__title">Quick Stats</h2>
        <div class="dash-stats">
          <div class="dash-stat">
            <span class="dash-stat__val">${stats.totalArticlesRead ?? 0}</span>
            <span class="dash-stat__label">Articles Read</span>
          </div>
          <div class="dash-stat">
            <span class="dash-stat__val">${stats.totalChallengesSolved ?? 0}</span>
            <span class="dash-stat__label">Challenges</span>
          </div>
          <div class="dash-stat">
            <span class="dash-stat__val">${accuracyPct}%</span>
            <span class="dash-stat__label">Quiz Accuracy</span>
          </div>
          <div class="dash-stat">
            <span class="dash-stat__val">${streak}</span>
            <span class="dash-stat__label">Day Streak</span>
          </div>
        </div>
      </section>

      <!-- Phase progress -->
      <section class="dash-section">
        <h2 class="dash-section__title">Phase Progress</h2>
        <div class="dash-phases">${phaseHTML}</div>
      </section>

    </div>
  `;
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
