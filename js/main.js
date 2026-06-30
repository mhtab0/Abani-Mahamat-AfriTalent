
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


/* 2. NAVBAR DYNAMIQUE AU SCROLL — effet shrink + ombre */

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