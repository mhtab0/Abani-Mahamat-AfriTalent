
/* DARK MODE / LIGHT MODE — toggle + localStorage */

// Récupération du bouton toggle et de l'élément <body>
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Icône à l'intérieur du bouton (lune / soleil)
const darkModeIcon = darkModeToggle ? darkModeToggle.querySelector('i') : null;

/**
 * Applique le thème sombre ou clair selon la valeur passée
 * @param {string} theme - "dark" ou "light"
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        // On change l'icône en soleil pour proposer de repasser en mode clair
        if (darkModeIcon) {
            darkModeIcon.classList.remove('bi-moon-fill');
            darkModeIcon.classList.add('bi-sun-fill');
        }
        if (darkModeToggle) {
            darkModeToggle.setAttribute('aria-label', 'Activer le mode clair');
        }
    } else {
        body.classList.remove('dark-mode');
        // On remet l'icône en lune
        if (darkModeIcon) {
            darkModeIcon.classList.remove('bi-sun-fill');
            darkModeIcon.classList.add('bi-moon-fill');
        }
        if (darkModeToggle) {
            darkModeToggle.setAttribute('aria-label', 'Activer le mode sombre');
        }
    }
}

const savedTheme = localStorage.getItem('afritalent-theme');

if (savedTheme) {
    applyTheme(savedTheme);
}

// Au clic sur le bouton : on bascule le thème et on l'enregistre
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
        const isDarkMode = body.classList.contains('dark-mode');

        if (isDarkMode) {
            applyTheme('light');
            localStorage.setItem('afritalent-theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('afritalent-theme', 'dark');
        }
    });
}


/* NAVBAR DYNAMIQUE AU SCROLL — effet shrink + ombre */

const mainNavbar = document.getElementById('mainNavbar');

// Distance de scroll (en pixels) à partir de laquelle la navbar change de style
const SCROLL_THRESHOLD = 50;

function handleNavbarScroll() {
    if (!mainNavbar) return;

    if (window.scrollY > SCROLL_THRESHOLD) {
        // On a scrollé : la navbar se rétrécit et gagne une ombre plus marquée
        mainNavbar.classList.add('navbar-scrolled');
    } else {
        mainNavbar.classList.remove('navbar-scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);

handleNavbarScroll();
/* BOUTON "RETOUR EN HAUT" — apparition au scroll + smooth scroll */
const backToTopButton = document.getElementById('backToTop');

// Distance de scroll à partir de laquelle le bouton devient visible
const BACK_TO_TOP_THRESHOLD = 300;

function handleBackToTopVisibility() {
    if (!backToTopButton) return;

    if (window.scrollY > BACK_TO_TOP_THRESHOLD) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

window.addEventListener('scroll', handleBackToTopVisibility);

// État correct dès le chargement
handleBackToTopVisibility();

// Au clic sur le bouton : on remonte en douceur en haut de la page
if (backToTopButton) {
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*  COMPTEURS ANIMES AU SCROLL — IntersectionObserver */
 
// On récupère tous les éléments qui ont un compteur à animer
// (statistiques du hero sur index.html + chiffres clés sur about.html)
const statElements = document.querySelectorAll('.stat-chiffre[data-target], .bento-number[data-target]');
 
// Durée totale de l'animation du compteur (en millisecondes)
const COUNTER_DURATION = 1500;
 
/**
 * Anime un élément de 0 jusqu'à sa valeur cible (data-target)
 * @param {HTMLElement} element - l'élément <p> contenant le chiffre
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const startTime = performance.now();
 
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / COUNTER_DURATION, 1);
 
        // On calcule la valeur actuelle en fonction de la progression
        const currentValue = Math.floor(progress * target);
        element.textContent = currentValue.toLocaleString('fr-FR');
 
        if (progress < 1) {
            // L'animation continue tant que la progression n'est pas terminée
            requestAnimationFrame(updateCounter);
        } else {
            // On affiche la valeur exacte à la fin pour éviter les arrondis
            element.textContent = target.toLocaleString('fr-FR');
        }
    }
 
    requestAnimationFrame(updateCounter);
}
 
// Observer qui déclenche l'animation uniquement quand l'élément entre dans le viewport
const counterObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            // On arrête d'observer cet élément une fois l'animation lancée
            // (pour ne pas la relancer à chaque scroll)
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // déclenche quand 50% de l'élément est visible
});
 
// On observe chaque compteur trouvé sur la page
statElements.forEach(function (element) {
    counterObserver.observe(element);
});
 
 
/* ANIMATION FADE-IN AU SCROLL — IntersectionObserver */
 
// On sélectionne toutes les sections principales à faire apparaître en fondu
const fadeSections = document.querySelectorAll(
    '.section-hero, .section-how, .section-categories, .section-testimonials, ' +
    '.section-cta, .section-story, .section-team, .section-values, .section-numbers'
);
 
// On ajoute la classe "fade-section" à chaque section pour préparer l'animation CSS
fadeSections.forEach(function (section) {
    section.classList.add('fade-section');
});
 
// Observer qui déclenche l'apparition en fondu lors de l'entrée dans le viewport
const fadeObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            // Une fois visible, on n'a plus besoin de l'observer
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // déclenche quand 15% de la section est visible
});
 
// On observe chaque section
fadeSections.forEach(function (section) {
    fadeObserver.observe(section);
});