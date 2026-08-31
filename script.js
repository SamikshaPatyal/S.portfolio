window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    setTimeout(function () {
        preloader.classList.add("intro-active");
    }, 3500);
    setTimeout(function () {
        preloader.classList.add("hide");
        setTimeout(() => preloader.remove(), 800);
    }, 7000);
});

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
if (menuBtn && navbar) {
    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("open");
        const icon = menuBtn.querySelector("i");
        if (icon) icon.classList.toggle("fa-xmark");
        if (icon) icon.classList.toggle("fa-bars");
    });
}

const typingText = document.getElementById("typing-text");
if (typingText) {
    const words = ["AI & ML Developer", "Web Developer", "Programmer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    function typeEffect() {
        const word = words[wordIndex];
        typingText.textContent = word.substring(0, deleting ? charIndex - 1 : charIndex + 1);
        deleting ? charIndex-- : charIndex++;
        if (charIndex === word.length) { deleting = true; setTimeout(typeEffect, 1400); return; }
        if (charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
        setTimeout(typeEffect, deleting ? 50 : 100);
    }
    typeEffect();
}

const revealElements = document.querySelectorAll(".reveal");
function revealOnScroll() {
    revealElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight - 80) element.classList.add("show");
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");
function updateActiveNav() {
    let currentSection = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150 && window.scrollY < section.offsetTop + section.offsetHeight - 150) currentSection = section.id;
    });
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`));
}
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

const scrollTop = document.getElementById("scroll-top");
if (scrollTop) {
    window.addEventListener("scroll", () => scrollTop.classList.toggle("show", window.scrollY > 500));
    scrollTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const counters = document.querySelectorAll(".counter");
let counterStarted = false;
function startCounters() {
    const statsSection = document.querySelector(".stats-section");
    if (counterStarted || !statsSection || statsSection.getBoundingClientRect().top >= window.innerHeight - 100) return;
    counterStarted = true;
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let count = 0;
        const update = () => { count += target / 60; counter.textContent = count < target ? Math.ceil(count) : `${target}+`; if (count < target) requestAnimationFrame(update); };
        update();
    });
}
window.addEventListener("scroll", startCounters);
startCounters();

const contactForm = document.getElementById("contact-form");
if (contactForm) contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for contacting me! Your message has been received.");
    contactForm.reset();
});

document.addEventListener("pointermove", function (event) {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    const interactive = event.target.closest(".about-card, .skill-card, .certificate-card, .mini-project, .timeline-content");
    if (!interactive) return;
    const bounds = interactive.getBoundingClientRect();
    interactive.style.setProperty("--card-x", `${event.clientX - bounds.left}px`);
    interactive.style.setProperty("--card-y", `${event.clientY - bounds.top}px`);
});
