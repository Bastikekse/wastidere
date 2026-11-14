(function () {
  'use strict';

  var form = document.getElementById('kontaktformular');
  if (!form) return;

  var status = document.getElementById('form-status');
  var csrfField = document.getElementById('csrf-token');
  var fields = form.querySelectorAll('input[required], textarea[required]');

  function getCookie(name) {
    var pairs = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0; i < pairs.length; i++) {
      var idx = pairs[i].indexOf('=');
      if (pairs[i].slice(0, idx) === name) return decodeURIComponent(pairs[i].slice(idx + 1));
    }
    return '';
  }

  function fillCsrf() {
    if (csrfField) csrfField.value = getCookie('wastidere_csrf') || '';
  }

  function errorElement(field) {
    return document.getElementById(field.id + '-error');
  }

  function showError(field, message) {
    var err = errorElement(field);
    err.textContent = message;
    err.hidden = false;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    var err = errorElement(field);
    err.textContent = '';
    err.hidden = true;
    field.removeAttribute('aria-invalid');
  }

  function messageFor(field) {
    if (field.validity.valueMissing) return field.getAttribute('data-error-missing');
    if (field.validity.typeMismatch) return field.getAttribute('data-error-type');
    return '';
  }

  Array.prototype.forEach.call(fields, function (field) {
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true' && !messageFor(field)) clearError(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    var firstInvalid = null;
    Array.prototype.forEach.call(fields, function (field) {
      var message = messageFor(field);
      if (message) {
        showError(field, message);
        if (!firstInvalid) firstInvalid = field;
      } else {
        clearError(field);
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    form.reset();
    fillCsrf();
    status.textContent = 'Danke, deine Nachricht wurde abgeschickt. (Hinweis: Es wurde nichts wirklich versendet.)';
  });

  fillCsrf();
})();