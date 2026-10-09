/**
 * Traduction FR / EN du portfolio.
 *
 * Principe : le français de index.html fait foi. Chaque chaîne visible est
 * étiquetée data-i18n="texte français" (la clé EST le texte français), donc
 * aucun texte n'est réécrit dans le HTML et le retour en français repose sur
 * un instantané pris au chargement (garantie de texte verbatim).
 *
 * - data-i18n="clé"                        : contenu texte de l'élément
 * - data-i18n-attr="nom"                   : l'attribut reçoit DICT[data-i18n]
 * - data-i18n-attr="nom=clé"               : attribut portant sa propre clé
 *   (élément ayant à la fois un texte et un attribut à traduire)
 *
 * Le choix est enregistré dans localStorage ('portfolio-lang') et répliqué
 * sur <html lang> ; chaque changement diffuse 'langchange' (theme.js s'en
 * sert pour réétiqueter ses propres libellés).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio-lang';

  /* clé = texte français (verbatim), valeur = traduction anglaise */
  var DICT = {
    /* Balise <head> */
    'Jahsauve Yimele — Développeur web & web designer | Portfolio':
      'Jahsauve Yimele — Web developer & web designer | Portfolio',
    'Jahsauve Yimele, développeur web, web designer, freelance, Douala, Cameroun, portfolio, PHP, Bootstrap':
      'Jahsauve Yimele, web developer, web designer, freelance, Douala, Cameroon, portfolio, PHP, Bootstrap',
    "Portfolio de Jahsauve Yimele, développeur web & web designer basé à Douala (Cameroun) : sites vitrines, e-commerce, applications web et design d'interfaces.":
      'Portfolio of Jahsauve Yimele, web developer & web designer based in Douala (Cameroon): brochure sites, e-commerce, web applications and interface design.',

    /* Barre latérale */
    'Jahsauve Yimele': 'Jahsauve Yimele',
    'Accueil': 'Home',
    'À propos': 'About',
    'Réalisations': 'Projects',
    'Services': 'Services',
    'Contact': 'Contact',

    /* Bascules de thème et de langue */
    'Thème clair': 'Light theme',
    'Thème sombre': 'Dark theme',
    'Passer en thème clair': 'Switch to light theme',
    'Passer en thème sombre': 'Switch to dark theme',
    'Passer en anglais': 'Switch to English',
    'Revenir en français': 'Switch to French',

    /* Hero */
    'Je suis': 'I am',
    'Développeur Web': 'Web Developer',
    'Développeur Web,Web Designer,Développeur Freelance':
      'Web Developer,Web Designer,Freelance Developer',

    /* À propos */
    'Je suis passionné par le développement web et la création d’interfaces intuitives. Grâce à mes compétences en design et en programmation, je conçois des solutions numériques modernes, performantes et centrées utilisateur.':
      'I am passionate about web development and creating intuitive interfaces. Thanks to my design and programming skills, I craft modern, performant, user-centred digital solutions.',
    'Développeur web & Web Designer.': 'Web developer & Web Designer.',
    'Je suis un développeur web créatif avec une solide expérience en conception d’interfaces et développement front-end/back-end. Mon objectif est de transformer des idées en produits digitaux efficaces.':
      'I am a creative web developer with solid experience in interface design and front-end/back-end development. My goal is to turn ideas into effective digital products.',
    'Date de naissance:': 'Date of birth:',
    '21 août 2006': '21 August 2006',
    'Site Web:': 'Website:',
    'Tel:': 'Phone:',
    'Ville:': 'City:',
    'Douala, Cameroun': 'Douala, Cameroon',
    'Âge:': 'Age:',
    'Diplôme :': 'Degree:',
    'BTS Développement Web': 'BTS Web Development',
    'Email:': 'Email:',
    'Freelance:': 'Freelance:',
    'Disponible': 'Available',

    /* Compétences */
    'Compétences': 'Skills',
    "Je maîtrise les technologies suivantes, que j'utilise pour concevoir des applications web modernes, dynamiques et performantes :":
      'I master the following technologies, which I use to build modern, dynamic and high-performing web applications:',
    'HTML': 'HTML',
    'CSS': 'CSS',
    'JavaScript': 'JavaScript',
    'PHP': 'PHP',

    /* Portfolio */
    'Portfolio': 'Portfolio',
    "Chaque projet que je réalise est le reflet de ma passion pour le développement web. Du design à la programmation, je mets un point d'honneur à créer des solutions modernes, efficaces et centrées sur l'utilisateur. Découvrez ici une sélection de mes réalisations en tant que":
      'Every project I create reflects my passion for web development. From design to programming, I take pride in building modern, effective, user-centred solutions. Discover here a selection of my work as a',
    'Développeur Web Full Stack PHP': 'Full Stack PHP Web Developer',
    '— des applications dynamiques, des sites responsives et des interfaces soignées, développés avec PHP, JavaScript, HTML/CSS, Bootstrap et bien plus. Explorez mes projets et voyez comment je transforme des idées en expériences web concrètes et performantes.':
      '— dynamic applications, responsive websites and polished interfaces, built with PHP, JavaScript, HTML/CSS, Bootstrap and more. Explore my projects and see how I turn ideas into concrete, high-performing web experiences.',
    'Projets phares': 'Featured projects',

    /* Projet : AfriTools AI */
    'SaaS · IA': 'SaaS · AI',
    'En cours': 'In progress',
    'AfriTools AI': 'AfriTools AI',
    'Projet SaaS en cours de développement pour les entrepreneurs africains : un outil IA de génération de contenus marketing.':
      'SaaS project under development for African entrepreneurs: an AI tool for generating marketing content.',
    'SaaS': 'SaaS',
    'IA': 'AI',
    'Marketing': 'Marketing',
    'Voir le site': 'Visit site',

    /* Projet : Fabiole Metal — site vitrine */
    'Site vitrine': 'Brochure site',
    'Nouveau': 'New',
    'Fabiole Metal — Site Vitrine': 'Fabiole Metal — Brochure Site',
    'Site vitrine professionnel réalisé pour un client : fabrication métallique sur mesure.':
      'Professional brochure site built for a client: custom metal fabrication.',
    'Client': 'Client',

    /* Projet : Fabiole Metal — e-commerce */
    'E-commerce': 'E-commerce',
    'Fabiole Metal — E-commerce': 'Fabiole Metal — E-commerce',
    "Boutique e-commerce réalisée pour le même client : vente d'ouvrages métalliques en ligne.":
      'E-commerce store built for the same client: online sales of metalwork.',
    'Boutique': 'Store',
    'Voir la boutique': 'Visit store',

    /* Projet : Global Edition SARL */
    'Global Edition SARL': 'Global Edition SARL',
    'Site vitrine présentant les services de la société Global Edition.':
      'Brochure site presenting the services of the Global Edition company.',

    /* Projet : Mon Portfolio */
    'Mon Portfolio': 'My Portfolio',
    'Présentation de mon profil de développeur.':
      'Presentation of my developer profile.',
    'Design': 'Design',

    /* Projet : Mon CV en ligne */
    'CV numérique': 'Online CV',
    'Mon CV en ligne': 'My Online CV',
    'Présentation de mon parcours et de mes compétences.':
      'Presentation of my background and skills.',
    'CV': 'CV',
    'Parcours': 'Career',
    'Voir le CV': 'View CV',

    /* Projet : Ecosanter */
    'Santé · Télémedecine': 'Health · Telemedicine',
    'Ecosanter': 'Ecosanter',
    'Plateforme de télémédecine — hors ligne pour le moment.':
      'Telemedicine platform — offline for now.',
    'Santé': 'Health',
    'Télémedecine': 'Telemedicine',
    "Voir l'aperçu": 'View preview',

    /* Projet : Gesnotes */
    'Éducation': 'Education',
    'Gesnotes': 'Gesnotes',
    'Gestion des notes pour les étudiants.': 'Grade management for students.',
    'Gestion': 'Management',

    /* Projet : Pharmatrix */
    'Santé · Médicaments': 'Health · Medications',
    'Pharmatrix': 'Pharmatrix',
    'Plateforme de localisation de médicaments — hors ligne pour le moment.':
      'Medicine locator platform — offline for now.',
    'Localisation': 'Location',

    /* Services */
    "En tant que développeur web full stack appliqué, je conçois des solutions numériques modernes, performantes et adaptées aux besoins réels des utilisateurs. Mes services s'étendent du développement front-end ergonomique à l'intégration back-end robuste avec PHP en architecture MVC, en passant par le responsive design et l’optimisation des performances.":
      "As a dedicated full stack web developer, I build modern, high-performing digital solutions tailored to users' real needs. My services range from ergonomic front-end development to robust PHP back-end integration with an MVC architecture, including responsive design and performance optimization.",
    'Conception d’interfaces modernes': 'Modern interface design',
    'Je crée des interfaces utilisateurs interactives, intuitives et adaptées à tous les écrans (responsive design), en utilisant HTML5, CSS3, JavaScript et Bootstrap.':
      'I create interactive, intuitive user interfaces adapted to every screen (responsive design), using HTML5, CSS3, JavaScript and Bootstrap.',
    'Développement back-end PHP (MVC)': 'PHP back-end development (MVC)',
    'Développement de la logique métier avec PHP en architecture MVC pour des sites web performants, organisés et évolutifs, avec gestion de base de données MySQL.':
      'Business logic development with PHP in an MVC architecture for performant, well-structured and scalable websites, with MySQL database management.',
    'Création de sites web dynamiques': 'Dynamic website development',
    'Réalisation de sites vitrines, portfolios, blogs, e-commerce avec des fonctionnalités sur mesure et une interface d’administration intégrée.':
      'Building brochure sites, portfolios, blogs and e-commerce stores with custom features and a built-in administration interface.',
    'Design Responsive & Mobile First': 'Responsive & Mobile First Design',
    'Optimisation de chaque site pour les mobiles et tablettes, avec un affichage fluide, rapide et ergonomique sur tous les appareils.':
      'Optimizing every site for mobiles and tablets, with smooth, fast and ergonomic rendering on all devices.',
    'Intégration & Optimisation': 'Integration & Optimization',
    'Intégration de maquettes UI/UX et optimisation du code pour un meilleur temps de chargement, référencement naturel (SEO) et accessibilité.':
      'UI/UX mockup integration and code optimization for better load times, natural search ranking (SEO) and accessibility.',
    'Maintenance & évolutivité': 'Maintenance & scalability',
    'Engagement et prise en charge des besoins évolutifs du client.':
      'Commitment to supporting the evolving needs of the client.',

    /* Contact */
    'Vous avez un projet, une idée ou une question ?':
      'Do you have a project, an idea or a question?',
    "N'hésitez pas à me contacter. Je suis disponible pour discuter de vos besoins et y apporter des solutions sur mesure.":
      "Don't hesitate to get in touch. I'm available to discuss your needs and provide tailor-made solutions.",
    'Adresse': 'Address',
    'Mambanda-Bonaberi, Douala': 'Mambanda-Bonaberi, Douala',
    'Tel': 'Phone',
    'Email': 'Email',
    'Nom': 'Name',
    'Objet': 'Subject',
    'Message': 'Message',
    'Votre nom…': 'Your name…',
    'votre@email.com': 'your@email.com',
    "L'objet du message…": 'Subject of your message…',
    'Votre message…': 'Your message…',
    'Envoyer le message': 'Send message',

    /* Pied de page */
    'Tous droits réservés': 'All rights reserved',

    /* Textes alternatifs, libellés d'accessibilité et titres */
    'Portrait de Jahsauve Yimele': 'Portrait of Jahsauve Yimele',
    'GitHub': 'GitHub',
    'WhatsApp': 'WhatsApp',
    'LinkedIn': 'LinkedIn',
    'Aperçu du site AfriTools AI': 'Preview of the AfriTools AI site',
    'Aperçu du site vitrine Fabiole Metal':
      'Preview of the Fabiole Metal brochure site',
    'Aperçu de la boutique Fabiole Metal':
      'Preview of the Fabiole Metal store',
    'Aperçu du site Global Edition SARL':
      'Preview of the Global Edition SARL site',
    'Aperçu de mon portfolio': 'Preview of my portfolio',
    'Aperçu de mon CV en ligne': 'Preview of my online CV',
    'Aperçu de la plateforme Ecosanter': 'Preview of the Ecosanter platform',
    "Aperçu de l'application Gesnotes": 'Preview of the Gesnotes application',
    'Aperçu de la plateforme Pharmatrix':
      'Preview of the Pharmatrix platform',
    'Scannez ce QR code pour ouvrir le projet sur mobile':
      'Scan this QR code to open the project on mobile',
    'Scannez ce QR code pour ouvrir le CV sur mobile':
      'Scan this QR code to open the CV on mobile',
    'QR code vers AfriTools AI': 'QR code to AfriTools AI',
    'QR code vers le site Fabiole Metal': 'QR code to the Fabiole Metal site',
    'QR code vers la boutique Fabiole Metal':
      'QR code to the Fabiole Metal store',
    'QR code vers le site Global Edition SARL':
      'QR code to the Global Edition SARL site',
    'QR code vers mon portfolio en ligne':
      'QR code to my online portfolio',
    'QR code vers mon CV en ligne': 'QR code to my online CV',
    'QR code vers Gesnotes': 'QR code to Gesnotes',
    "Agrandir l'aperçu": 'Enlarge preview',
    'Aperçu de la page de recherche': 'Search page preview',
    'Services de Global Edition SARL': 'Global Edition SARL services',
    'Aperçu de mon curriculum vitae': 'Preview of my curriculum vitae',
    'Voir le site de validation': 'Visit the validation site'
  };

  var root = document.documentElement;
  var toggle = document.getElementById('lang-toggle');
  var textSnapshot = [];
  var attrSnapshot = [];
  var typedInstances = [];

  function currentLang() {
    return root.getAttribute('lang') === 'en' ? 'en' : 'fr';
  }

  /* Traduit une clé (texte FR) dans la langue active */
  function t(key) {
    if (currentLang() === 'en' && DICT[key] !== undefined) return DICT[key];
    return key;
  }

  /* data-i18n-attr="nom" ou data-i18n-attr="nom=clé; nom2=clé2" */
  function parseAttrPairs(raw) {
    if (!raw) return [];
    return raw.split(';').map(function (pair) {
      var idx = pair.indexOf('=');
      return idx === -1
        ? { name: pair.trim(), key: null }
        : { name: pair.slice(0, idx).trim(), key: pair.slice(idx + 1).trim() };
    }).filter(function (p) { return p.name; });
  }

  /* Instantané du français d'origine : textes et attributs bruts */
  function snapshot() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var nodes = Array.prototype.filter.call(el.childNodes, function (n) {
        return n.nodeType === 3 && n.nodeValue.trim();
      });
      if (!nodes.length) return;
      textSnapshot.push({
        el: el,
        nodes: nodes,
        raw: nodes.map(function (n) { return n.nodeValue; })
      });
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      parseAttrPairs(el.getAttribute('data-i18n-attr')).forEach(function (p) {
        var key = p.key !== null ? p.key : el.getAttribute('data-i18n');
        var value = el.getAttribute(p.name);
        if (value === null) return;
        attrSnapshot.push({ el: el, name: p.name, key: key, raw: value });
      });
    });
  }

  function applyText(s, lang) {
    if (!s.el.isConnected) return;
    var key = s.el.getAttribute('data-i18n');
    if (lang === 'en') {
      var value = DICT[key] !== undefined ? DICT[key] : key;
      var lead = (s.raw[0].match(/^\s*/) || [''])[0];
      var trail = (s.raw[s.raw.length - 1].match(/\s*$/) || [''])[0];
      s.nodes[0].nodeValue = lead + value + trail;
      for (var i = 1; i < s.nodes.length; i++) s.nodes[i].nodeValue = '';
    } else {
      s.nodes.forEach(function (n, i) { n.nodeValue = s.raw[i]; });
    }
  }

  function applyAttribute(s, lang) {
    if (!s.el.isConnected) return;
    if (lang === 'en') {
      s.el.setAttribute(s.name, DICT[s.key] !== undefined ? DICT[s.key] : s.key);
    } else {
      s.el.setAttribute(s.name, s.raw);
    }
  }

  /* typed.js : on conserve les instances créées par main.js pour pouvoir
     les arrêter puis relancer l'animation avec les textes de la langue active */
  function wrapTyped() {
    if (typeof window.Typed !== 'function' || window.Typed.__i18nWrapped) return;
    var Original = window.Typed;
    var Wrapped = function (selector, options) {
      var instance = new Original(selector, options);
      typedInstances.push(instance);
      return instance;
    };
    Wrapped.prototype = Original.prototype;
    Wrapped.__i18nWrapped = true;
    window.Typed = Wrapped;
  }

  function restartTyped() {
    if (!window.Typed) return;
    typedInstances.forEach(function (instance) {
      if (instance && typeof instance.destroy === 'function') instance.destroy();
    });
    typedInstances.length = 0;
    var el = document.querySelector('.typed');
    if (!el) return;
    var items = (el.getAttribute('data-typed-items') || '').split(',');
    if (!items[0]) return;
    el.textContent = items[0];
    new window.Typed('.typed', {
      strings: items,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  function paintToggle(lang) {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      t(lang === 'fr' ? 'Passer en anglais' : 'Revenir en français')
    );
    toggle.querySelectorAll('.lang-opt').forEach(function (opt) {
      var active = opt.getAttribute('data-lang') === lang;
      opt.classList.toggle('is-active', active);
      if (active) opt.setAttribute('aria-current', 'true');
      else opt.removeAttribute('aria-current');
    });
  }

  function apply(lang, persist) {
    if (lang !== 'en' && lang !== 'fr') lang = 'fr';
    var changed = lang !== currentLang();
    root.setAttribute('lang', lang);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) { /* stockage indisponible */ }
    }
    textSnapshot.forEach(function (s) { applyText(s, lang); });
    attrSnapshot.forEach(function (s) { applyAttribute(s, lang); });
    paintToggle(lang);
    if (changed) {
      restartTyped();
      document.dispatchEvent(
        new CustomEvent('langchange', { detail: { lang: lang } })
      );
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      apply(currentLang() === 'fr' ? 'en' : 'fr', true);
    });
  }

  /* Reste cohérent si un autre onglet change la langue */
  window.addEventListener('storage', function (event) {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    var lang = null;
    try { lang = localStorage.getItem(STORAGE_KEY); } catch (e) { lang = null; }
    if (lang !== 'en' && lang !== 'fr') lang = 'fr';
    if (lang !== currentLang()) apply(lang, false);
  });

  wrapTyped();
  snapshot();
  /* <html lang> a déjà été posé par le script anti-flash de <head> */
  apply(currentLang(), false);
  /* Le DOM est traduit : main.css peut afficher le corps (voir le
     sélecteur html[lang="en"]:not([data-i18n-ready])). */
  root.setAttribute('data-i18n-ready', '');

  window.I18N = {
    t: t,
    lang: currentLang,
    apply: apply,
    dict: DICT
  };
})();
