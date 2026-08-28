(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('christies-theme');
  if (savedTheme) root.dataset.theme = savedTheme;

  const updateThemeButtons = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const dark = root.dataset.theme !== 'light';
      btn.textContent = dark ? '☀' : '☾';
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
  };
  updateThemeButtons();

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('christies-theme', root.dataset.theme);
    updateThemeButtons();
  }));

  const menuBtn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  document.querySelectorAll('[data-menu-filter]').forEach(btn => btn.addEventListener('click', () => {
    const target = btn.dataset.menuFilter;
    document.querySelectorAll('[data-menu-filter]').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.menu-panel').forEach(panel => panel.classList.toggle('active', panel.id === target));
  }));

  document.querySelectorAll('[data-form-tab]').forEach(btn => btn.addEventListener('click', () => {
    const target = btn.dataset.formTab;
    document.querySelectorAll('[data-form-tab]').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.form-view').forEach(v => v.classList.toggle('active', v.id === target));
  }));

  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) status.textContent = 'Thank you. Your request has been received and the Christie’s team will confirm shortly.';
      form.reset();
    });
  });
})();
