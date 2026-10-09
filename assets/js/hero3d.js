/**
 * Hero 3D — scène décorative (three.js)
 * Forme abstraite métallique bleue + coque géométrique filaire + particules.
 * Elle apparaît derrière le texte du hero, avec un léger parallaxe souris.
 */
(function() {
  'use strict';

  var canvas = document.getElementById('hero-3d');
  if (!canvas || typeof THREE === 'undefined') return;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, // fond transparent : la photo du hero reste visible
      antialias: true
    });
  } catch (e) {
    return; // WebGL indisponible : le hero reste intact
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var group = new THREE.Group();
  scene.add(group);

  /* Couleurs pilotées par les tokens CSS (--scene-*) : le thème clair/sombre
     reste la source unique, la scène se recolore sur l'événement 'themechange'. */
  function sceneColor(token) {
    var value = getComputedStyle(document.documentElement)
      .getPropertyValue(token)
      .trim()
      .replace('#', '');
    var parsed = parseInt(value, 16);
    return isNaN(parsed) ? null : parsed;
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light'
      ? 'light'
      : 'dark';
  }

  // Forme principale : nœud toroïdal métallique
  var knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.7, 0.5, 240, 40),
    new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.55,
      roughness: 0.28,
      emissive: 0x0a1f4d,
      emissiveIntensity: 0.5
    })
  );
  group.add(knot);

  // Coque géométrique filaire autour de la forme
  var shell = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(4.3, 1)),
    new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.13
    })
  );
  group.add(shell);

  // Champ de particules
  var count = 320;
  var positions = new Float32Array(count * 3);
  for (var i = 0; i < count; i++) {
    var r = 7 + Math.random() * 9;
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  var starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  var stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0x8ab4ff,
    size: 0.05,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true
  }));
  scene.add(stars);

  // Éclairage
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  var key = new THREE.PointLight(0xffffff, 1.1);
  key.position.set(6, 6, 8);
  scene.add(key);
  var cyan = new THREE.PointLight(0x22d3ee, 0.9);
  cyan.position.set(-7, -3, 5);
  scene.add(cyan);
  var blue = new THREE.PointLight(0x3b82f6, 0.7);
  blue.position.set(0, -6, -7);
  scene.add(blue);

  /* Application du thème courant (puis à chaque bascule clair/sombre) */
  function applySceneTheme(theme) {
    var primary = sceneColor('--scene-primary');
    var secondary = sceneColor('--scene-secondary');
    var particle = sceneColor('--scene-particle');
    var emissive = sceneColor('--scene-emissive');

    if (primary !== null) {
      knot.material.color.setHex(primary);
      blue.color.setHex(primary);
    }
    if (secondary !== null) {
      shell.material.color.setHex(secondary);
      cyan.color.setHex(secondary);
    }
    if (particle !== null) stars.material.color.setHex(particle);
    if (emissive !== null) knot.material.emissive.setHex(emissive);

    // Traceur utile pour le débogage et les vérifications automatisées
    canvas.setAttribute('data-scene-theme', theme || currentTheme());
  }

  applySceneTheme(currentTheme());
  document.addEventListener('themechange', function (event) {
    applySceneTheme(event.detail && event.detail.theme);
  });

  // Parallaxe douce au survol de la souris
  var targetX = 0;
  var targetY = 0;
  window.addEventListener('mousemove', function(e) {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, {
    passive: true
  });

  function resize() {
    var hero = canvas.parentElement || document.getElementById('hero');
    var w = hero.clientWidth || window.innerWidth;
    var h = hero.clientHeight || window.innerHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Sur grand écran, la forme se décale à droite pour laisser la place au texte centré
    if (camera.aspect >= 1.2) {
      group.position.x = 2.8;
      group.scale.setScalar(1);
    } else {
      group.position.x = 0;
      group.scale.setScalar(0.75);
    }
  }
  window.addEventListener('resize', resize);
  resize();

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var start = performance.now();

  function tick(now) {
    var t = (now - start) / 1000;
    if (!reduced) {
      knot.rotation.y = t * 0.35;
      knot.rotation.x = Math.sin(t * 0.4) * 0.4;
      shell.rotation.y = -t * 0.07;
      shell.rotation.x = t * 0.03;
      stars.rotation.y = t * 0.02;
      group.position.y = Math.sin(t * 0.7) * 0.18;
      group.rotation.y += (targetX * 0.25 - group.rotation.y) * 0.04;
      group.rotation.x += (targetY * 0.15 - group.rotation.x) * 0.04;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
