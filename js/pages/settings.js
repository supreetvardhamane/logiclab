// js/pages/settings.js — Theme, font size, mode, export/import, reset progress
import { getState, updateSettings, toggleTheme, exportProgress, importProgress, resetProgress } from '../progress.js';

export async function render(params, app) {
  const s = getState();

  app.innerHTML = `
    <div style="padding:var(--sp-8);max-width:540px">
      <h1>Settings</h1>

      <section style="margin-top:var(--sp-8)">
        <h3 style="margin-bottom:var(--sp-4);color:var(--brand-purple)">Appearance</h3>
        <div style="display:flex;flex-direction:column;gap:var(--sp-4)">
          <label style="display:flex;justify-content:space-between;align-items:center">
            <span>Dark Mode</span>
            <button id="theme-toggle" class="btn btn-secondary btn-sm">
              ${s.settings.theme === 'dark' ? '☀ Light' : '☾ Dark'}
            </button>
          </label>
          <label style="display:flex;justify-content:space-between;align-items:center">
            <span>Font Size</span>
            <div style="display:flex;gap:var(--sp-2)">
              ${['small','medium','large','xl'].map(sz => `
                <button class="btn ${s.settings.fontSize === sz ? 'btn-primary' : 'btn-secondary'} btn-sm font-size-btn"
                        data-size="${sz}">${sz[0].toUpperCase()}</button>
              `).join('')}
            </div>
          </label>
          <label style="display:flex;justify-content:space-between;align-items:center">
            <span>Learning Mode</span>
            <div style="display:flex;gap:var(--sp-2)">
              <button class="btn ${s.settings.mode === '3-week' ? 'btn-primary' : 'btn-secondary'} btn-sm mode-btn"
                      data-mode="3-week">3-Week</button>
              <button class="btn ${s.settings.mode === 'self-paced' ? 'btn-primary' : 'btn-secondary'} btn-sm mode-btn"
                      data-mode="self-paced">Self-Paced</button>
            </div>
          </label>
        </div>
      </section>

      <section style="margin-top:var(--sp-8)">
        <h3 style="margin-bottom:var(--sp-4);color:var(--brand-purple)">Data</h3>
        <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
          <button id="export-btn" class="btn btn-secondary">Export Progress JSON</button>
          <button id="import-btn" class="btn btn-secondary">Import Progress JSON</button>
          <input id="import-file" type="file" accept=".json" style="display:none">
        </div>
      </section>

      <section style="margin-top:var(--sp-8)">
        <h3 style="margin-bottom:var(--sp-4);color:var(--red)">Danger Zone</h3>
        <button id="reset-btn" class="btn btn-danger">Reset All Progress</button>
      </section>
    </div>`;

  // Theme toggle
  app.querySelector('#theme-toggle').addEventListener('click', () => {
    const next = toggleTheme();
    render(params, app);
  });

  // Font size
  app.querySelectorAll('.font-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateSettings({ fontSize: btn.dataset.size });
      render(params, app);
    });
  });

  // Mode
  app.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateSettings({ mode: btn.dataset.mode });
      render(params, app);
    });
  });

  // Export
  app.querySelector('#export-btn').addEventListener('click', () => {
    const json = exportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
      href: url, download: `logiclab-progress-${new Date().toISOString().slice(0,10)}.json`
    });
    a.click();
    URL.revokeObjectURL(url);
  });

  // Import
  const fileInput = app.querySelector('#import-file');
  app.querySelector('#import-btn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const ok   = importProgress(text);
    alert(ok ? 'Progress imported successfully!' : 'Invalid progress file.');
    if (ok) render(params, app);
  });

  // Reset
  app.querySelector('#reset-btn').addEventListener('click', () => {
    if (confirm('Reset ALL progress? This cannot be undone.')) {
      resetProgress();
      location.hash = '/';
    }
  });
}
