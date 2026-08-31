// ===============================
// PRELOADER
// ===============================

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("intro-active");
    }, 3500);

    setTimeout(() => {
        preloader.classList.add("hide");

        setTimeout(() => {
            preloader.remove();
        }, 800);
    }, 7000);
});


// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("open");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
        }
    });

    // Close menu after clicking a navigation link
    const mobileLinks = navbar.querySelectorAll("nav a");

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });
}


// ===============================
// TYPING EFFECT
// ===============================

const typingText = document.getElementById("typing-text");

if (typingText) {

    const words = [
        "AI & ML Developer",
        "Web Developer",
        "Programmer",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const word = words[wordIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = word.substring(0, charIndex);

        // Finished typing
        if (!deleting && charIndex === word.length) {

            deleting = true;

            setTimeout(typeEffect, 1400);
            return;
        }

        // Finished deleting
        if (deleting && charIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, deleting ? 50 : 100);
    }

    typeEffect();
}


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach(element => {

        const position = element.getBoundingClientRect().top;

        if (position < window.innerHeight - 80) {
            element.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionBottom =
            section.offsetTop + section.offsetHeight - 150;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


// ===============================
// SCROLL TO TOP
// ===============================

const scrollTop = document.getElementById("scroll-top");

if (scrollTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            scrollTop.classList.add("show");
        } else {
            scrollTop.classList.remove("show");
        }

    });

    scrollTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


// ===============================
// COUNTERS
// ===============================

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    const statsSection =
        document.querySelector(".stats-section");

    if (
        counterStarted ||
        !statsSection ||
        statsSection.getBoundingClientRect().top >=
        window.innerHeight - 100
    ) {
        return;
    }

    counterStarted = true;

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        function updateCounter() {

            count += target / 60;

            if (count < target) {
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = `${target}+`;
            }
        }

        updateCounter();
    });
}

window.addEventListener("scroll", startCounters);

startCounters();


// ===============================
// CONTACT FORM
// ===============================

const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert(
            "Thank you for contacting me! Your message has been received."
        );

        contactForm.reset();
    });
}


// ===============================
// CURSOR EFFECT
// ===============================

document.addEventListener("pointermove", function (event) {

    // Update page background position
    document.documentElement.style.setProperty(
        "--pointer-x",
        `${event.clientX}px`
    );

    document.documentElement.style.setProperty(
        "--pointer-y",
        `${event.clientY}px`
    );


    // Find card under cursor
    const interactive = event.target.closest(
        ".about-card, .skill-card, .certificate-card, .mini-project, .timeline-content"
    );

    if (!interactive) return;


    const bounds =
        interactive.getBoundingClientRect();


    // Move card glow with cursor
    interactive.style.setProperty(
        "--card-x",
        `${event.clientX - bounds.left}px`
    );

    interactive.style.setProperty(
        "--card-y",
        `${event.clientY - bounds.top}px`
    );
});


// ===============================
// UPDATE CARD GLOW ON TOUCH
// ===============================

document.addEventListener("touchstart", function (event) {

    const card = event.target.closest(
        ".about-card, .skill-card, .certificate-card, .mini-project, .timeline-content"
    );

    if (!card) return;

    card.style.setProperty("--card-x", "50%");
    card.style.setProperty("--card-y", "50%");
});