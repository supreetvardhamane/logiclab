/**
 * LogicLab — State Layer (progress.js)
 * Single source of truth for all user state.
 * CRITICAL RULE: All localStorage mutations go through this module.
 * Page code must never call localStorage.setItem() directly.
 */

const KEY = 'logiclab_user';

// ── READ ──────────────────────────────────────────────────────
export function getState() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : initState();
}

function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// ── INIT ──────────────────────────────────────────────────────
function initState() {
  const state = {
    version:      '1.0.0',
    joinedAt:     today(),
    lastActiveAt: today(),

    // Gamification
    xp:     0,
    level:  'Beginner',
    badges: [],
    streak: { count: 1, lastDate: today() },
    dailyXP: { date: today(), earned: 0 },

    // Progress
    modules:    {},
    challenges: {},
    srs:        {},
    bookmarks:  [],
    lastVisited: null,

    // Stats
    stats: {
      totalArticlesRead:    0,
      totalChallengesSolved: 0,
      totalQuizzesPassed:   0,
      totalReviewsDone:     0,
      totalHintsUsed:       0,
      totalSolutionsViewed: 0,
      quizAccuracySum:      0,
      quizAccuracyCount:    0,
      fastestChallenge:     null,
      longestStreak:        1,
    },

    settings: {
      theme:          'dark',
      fontSize:       'medium',
      mode:           'self-paced',
      editorFontSize: 13,
    },
  };

  // Module 1 always starts unlocked
  state.modules['1'] = createModuleState(true);
  saveState(state);
  return state;
}

// ── MODULE HELPERS ────────────────────────────────────────────
function createModuleState(unlocked = false) {
  return {
    unlocked,
    startedAt:   null,
    completedAt: null,
    articles:    {},
    quiz: {
      passed:    false,
      score:     0,
      total:     0,
      attempts:  0,
      passedAt:  null,
      wrongQIds: [],
    },
  };
}

function ensureModule(s, moduleId) {
  const id = String(moduleId);
  if (!s.modules[id]) {
    s.modules[id] = createModuleState(false);
  }
}

function unlockNextModule(s, moduleId) {
  const nextId = String(Number(moduleId) + 1);
  if (!s.modules[nextId]) {
    s.modules[nextId] = createModuleState(true);
  } else {
    s.modules[nextId].unlocked = true;
  }
}

// ── XP & LEVELS ───────────────────────────────────────────────
const LEVELS = [
  { name: 'Beginner',  min: 0    },
  { name: 'Bronze',    min: 500  },
  { name: 'Silver',    min: 1500 },
  { name: 'Gold',      min: 3500 },
  { name: 'Platinum',  min: 7000 },
];

function computeLevel(xp) {
  return [...LEVELS].reverse().find(l => xp >= l.min).name;
}

export function addXP(amount) {
  const s = getState();
  const prevLevel = s.level;
  s.xp += amount;
  s.dailyXP.earned += amount;
  s.level = computeLevel(s.xp);
  checkBadges(s);
  updateStreak(s);
  saveState(s);
  return { newXP: s.xp, newLevel: s.level, leveledUp: s.level !== prevLevel };
}

// ── STREAK ────────────────────────────────────────────────────
function updateStreak(s) {
  const t = today();
  const last = s.streak.lastDate;
  if (last === t) return;                    // already updated today
  if (yesterday() === last) {
    s.streak.count++;                        // consecutive day
    s.xp += 20;                             // streak bonus
  } else {
    s.streak.count = 1;                      // broken — reset
  }
  s.streak.lastDate = t;
  s.stats.longestStreak = Math.max(s.stats.longestStreak, s.streak.count);
}

// ── ARTICLE COMPLETION ────────────────────────────────────────
export function markArticleRead(moduleId, articleId) {
  const s = getState();
  const mid = String(moduleId);
  const aid = String(articleId);
  ensureModule(s, mid);

  if (!s.modules[mid].startedAt) s.modules[mid].startedAt = today();

  s.modules[mid].articles[aid] = { read: true, readAt: today() };
  s.stats.totalArticlesRead++;
  s.lastVisited = { moduleId: mid, articleId: aid, type: 'article' };

  addXP(10); // addXP calls saveState
}

// ── QUIZ COMPLETION ───────────────────────────────────────────
export function recordQuizResult(moduleId, score, total, wrongQIds) {
  const s = getState();
  const mid = String(moduleId);
  ensureModule(s, mid);

  const passMark = s.modules[mid].quiz.passMark ?? Math.ceil(total * 0.7);
  const passed   = score >= passMark;
  const isFirst  = s.modules[mid].quiz.attempts === 0;

  s.modules[mid].quiz = {
    passed,
    score,
    total,
    attempts:  s.modules[mid].quiz.attempts + 1,
    passedAt:  passed ? today() : s.modules[mid].quiz.passedAt,
    wrongQIds,
  };

  if (passed) {
    s.stats.totalQuizzesPassed++;
    s.stats.quizAccuracySum += Math.round((score / total) * 100);
    s.stats.quizAccuracyCount++;
    if (!s.modules[mid].completedAt) s.modules[mid].completedAt = today();
    unlockNextModule(s, mid);
    addXP(isFirst ? 50 : 25);
  }

  // Wrong answers → SRS queue
  wrongQIds.forEach(qId => addToSRS(s, qId, 'quiz-wrong'));
  saveState(s);
  return passed;
}

// ── CHALLENGE COMPLETION ──────────────────────────────────────
export function recordChallengeSolved(challengeId, seconds, usedHint, usedSolution) {
  const s = getState();
  const prev = s.challenges[challengeId] || { attempts: 0 };

  s.challenges[challengeId] = {
    solved:      true,
    attempts:    prev.attempts + 1,
    solvedAt:    today(),
    timeSeconds: seconds,
    usedHint,
    usedSolution,
  };

  s.stats.totalChallengesSolved++;
  if (usedHint) s.stats.totalHintsUsed++;
  if (usedSolution) s.stats.totalSolutionsViewed++;

  if (!s.stats.fastestChallenge || seconds < s.stats.fastestChallenge.seconds) {
    s.stats.fastestChallenge = { id: challengeId, seconds };
  }

  if (!usedSolution) addXP(75); // addXP calls saveState
  else saveState(s);
}

// ── HINT USED ─────────────────────────────────────────────────
export function recordHintUsed(challengeId) {
  const s = getState();
  if (!s.challenges[challengeId]) s.challenges[challengeId] = { attempts: 0 };
  s.stats.totalHintsUsed++;
  saveState(s);
}

// ── SRS (SM-2) ────────────────────────────────────────────────
export function addToSRS(s, qId, type, meta = {}) {
  if (!s.srs[qId]) {
    s.srs[qId] = {
      type,
      ...meta,
      easeFactor:  2.5,
      interval:    1,
      repetitions: 0,
      nextReview:  today(),
      addedAt:     today(),
    };
  }
}

export function updateSRSCard(cardId, quality) {  // quality 1–5
  const s = getState();
  const card = s.srs[cardId];
  if (!card) return;

  if (quality >= 3) {
    if (card.repetitions === 0)      card.interval = 1;
    else if (card.repetitions === 1) card.interval = 3;
    else card.interval = Math.round(card.interval * card.easeFactor);
    card.repetitions++;
  } else {
    card.interval    = 1;
    card.repetitions = 0;
  }

  card.easeFactor = Math.max(
    1.3,
    card.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );
  card.nextReview = addDays(today(), card.interval);
  s.stats.totalReviewsDone++;
  saveState(s);
  return { newInterval: card.interval, nextReview: card.nextReview };
}

export function getDueCards() {
  const { srs } = getState();
  return Object.entries(srs)
    .filter(([, c]) => c.nextReview <= today())
    .map(([id, c]) => ({ id, ...c }));
}

// ── BOOKMARKS ────────────────────────────────────────────────
export function addBookmark(id, moduleId, articleId, title) {
  const s = getState();
  if (s.bookmarks.some(b => b.id === id)) return;
  s.bookmarks.push({ id, moduleId, articleId, title, addedAt: today() });
  addToSRS(s, id, 'bookmark', { source: title, question: '', answer: '' });
  saveState(s);
}

export function removeBookmark(id) {
  const s = getState();
  s.bookmarks = s.bookmarks.filter(b => b.id !== id);
  saveState(s);
}

// ── SETTINGS ─────────────────────────────────────────────────
export function updateSettings(partial) {
  const s = getState();
  Object.assign(s.settings, partial);
  saveState(s);
  applySettings(s.settings);
}

export function applySettings(settings) {
  const html = document.documentElement;
  html.dataset.theme = settings.theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : settings.theme;
  html.dataset.fontSize = settings.fontSize;
}

// ── DARK MODE TOGGLE ─────────────────────────────────────────
export function toggleTheme() {
  const s = getState();
  const next = s.settings.theme === 'dark' ? 'light' : 'dark';
  s.settings.theme = next;
  saveState(s);
  document.documentElement.dataset.theme = next;
  return next;
}

// ── LAST VISITED ─────────────────────────────────────────────
export function setLastVisited(moduleId, articleId, type = 'article') {
  const s = getState();
  s.lastVisited = { moduleId: String(moduleId), articleId: String(articleId), type };
  s.lastActiveAt = today();
  saveState(s);
}

// ── BADGES ───────────────────────────────────────────────────
const BADGE_RULES = [
  {
    id: 'hello-world',
    check: s => s.modules['2']?.quiz?.passed,
  },
  {
    id: 'variable-wizard',
    check: s => s.modules['3']?.quiz?.passed,
  },
  {
    id: 'logic-gate',
    check: s => {
      const conditionalChallenges = ['conditionals-max2', 'conditionals-oddeven', 'conditionals-grade', 'conditionals-max3', 'conditionals-roots'];
      return conditionalChallenges.every(id => s.challenges[id]?.solved);
    },
  },
  {
    id: 'loop-hero',
    check: s => {
      const loopChallenges = ['loops-mul-table','loops-sum-n','loops-factorial','loops-armstrong','loops-reverse','loops-gcd','loops-pattern','loops-palindrome'];
      return loopChallenges.every(id => s.challenges[id]?.solved);
    },
  },
  {
    id: 'pointer-wrangler',
    check: s => s.modules['9']?.quiz?.passed,
  },
  {
    id: 'oop-architect',
    check: s => s.modules['12']?.quiz?.passed,
  },
  {
    id: 'polymorphist',
    check: s => s.modules['15']?.quiz?.passed,
  },
  {
    id: 'bug-slayer',
    check: s => {
      // 3 challenges solved on first try in a row — tracked via attempts
      const solved = Object.values(s.challenges).filter(c => c.solved && c.attempts === 1);
      return solved.length >= 3;
    },
  },
  {
    id: 'streak-fire',
    check: s => s.streak.count >= 7,
  },
  {
    id: 'perfect-score',
    check: s => Object.values(s.modules).some(m => m.quiz?.score === m.quiz?.total && m.quiz?.total > 0 && m.quiz?.attempts === 1),
  },
  {
    id: 'speed-coder',
    check: s => s.stats.fastestChallenge && s.stats.fastestChallenge.seconds <= 300,
  },
  {
    id: 'bookworm',
    check: s => s.bookmarks.length >= 10,
  },
  {
    id: 'course-complete',
    check: s => {
      for (let i = 1; i <= 19; i++) {
        if (!s.modules[String(i)]?.quiz?.passed) return false;
      }
      return true;
    },
  },
];

function checkBadges(s) {
  const newBadges = [];
  for (const rule of BADGE_RULES) {
    if (!s.badges.includes(rule.id) && rule.check(s)) {
      s.badges.push(rule.id);
      newBadges.push(rule.id);
    }
  }
  return newBadges;
}

// ── EXPORT / IMPORT ───────────────────────────────────────────
export function exportProgress() {
  return JSON.stringify(getState(), null, 2);
}

export function importProgress(json) {
  try {
    const data = JSON.parse(json);
    if (!data.version) throw new Error('Invalid progress file — missing version field');
    saveState(data);
    applySettings(data.settings);
    return true;
  } catch (e) {
    console.error('importProgress failed:', e);
    return false;
  }
}

export function resetProgress() {
  localStorage.removeItem(KEY);
  return initState();
}

// ── HELPERS ───────────────────────────────────────────────────
function today() {
  return new Date().toISOString().slice(0, 10);
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// Initialise theme on load
(function bootstrap() {
  const s = getState();
  s.lastActiveAt = today();
  saveState(s);
  applySettings(s.settings);
})();
