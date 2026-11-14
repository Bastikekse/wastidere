(function () {
  'use strict';

  var banner = document.getElementById('cookie-banner');
  var statusEl = document.getElementById('cookie-status');
  if (!banner) return;

  try {
    if (localStorage.getItem('wastidere_consent_mock')) banner.hidden = true;
  } catch (e) {}

  function scrollToBanner() {
    banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    banner.focus({ preventScroll: true });
  }

  banner.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-consent]');
    if (!btn) return;

    var choice = btn.getAttribute('data-consent');
    banner.hidden = true;
    try { localStorage.setItem('wastidere_consent_mock', choice); } catch (e) {}

    if (statusEl) {
      statusEl.textContent = choice === 'yes'
        ? 'Auswahl gespeichert (Mock): Statistik-Cookies erlaubt.'
        : 'Auswahl gespeichert (Mock): Es werden nur notwendige Cookies verwendet.';
    }

    var main = document.getElementById('main');
    if (main) {
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cookie-settings]')) {
      banner.hidden = false;
      scrollToBanner();
    }
  });
})();