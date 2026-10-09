/**
 * Bascule clair / sombre.
 *
 * - la valeur initiale est posée par le script anti-flash de <head> ;
 * - le choix utilisateur est enregistré dans localStorage ('portfolio-theme') ;
 * - chaque changement diffuse un événement 'themechange' sur le document,
 *   notamment pour que la scène 3D du hero se recolore avec le thème actif.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio-theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function readStored() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) {
      return null; // stockage indisponible (mode privé, cookies bloqués)
    }
  }

  function store(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* même sans persistance, le thème reste actif pour la session */
    }
  }

  /* Libellés traduits quand le module i18n est chargé, sinon le français */
  function translate(key) {
    return window.I18N ? window.I18N.t(key) : key;
  }

  /* Met à jour l'interrupteur de la barre latérale (desktop et tiroir mobile) */
  function paint(theme) {
    if (!toggle) return;
    var isLight = theme === 'light';
    toggle.setAttribute(
      'aria-label',
      translate(isLight ? 'Passer en thème sombre' : 'Passer en thème clair')
    );
    var icon = toggle.querySelector('i');
    if (icon) icon.className = isLight ? 'bi bi-moon-stars' : 'bi bi-sun';
    var label = toggle.querySelector('.theme-toggle-label');
    if (label) label.textContent = translate(isLight ? 'Thème sombre' : 'Thème clair');
  }

  function apply(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) store(theme);
    paint(theme);
    document.dispatchEvent(
      new CustomEvent('themechange', { detail: { theme: theme } })
    );
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      apply(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* Tant qu'aucun choix n'a été fait, suivre la préférence système */
  var media = window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: light)')
    : null;

  function systemTheme() {
    return media && media.matches ? 'light' : 'dark';
  }

  /* Reste cohérent si un autre onglet modifie (ou efface) le choix enregistré */
  window.addEventListener('storage', function (event) {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    // Clé effacée : plus aucun choix explicite, on repasse sur le système
    var next = readStored() || systemTheme();
    if (next !== currentTheme()) apply(next, false);
  });

  if (media && media.addEventListener) {
    media.addEventListener('change', function (event) {
      if (readStored()) return;
      apply(event.matches ? 'light' : 'dark', false);
    });
  }

  /* Synchronise l'interrupteur avec la valeur déjà appliquée par l'anti-flash */
  paint(currentTheme());

  /* Repasse les libellés à la langue active après un changement de langue */
  document.addEventListener('langchange', function () {
    paint(currentTheme());
  });
})();
