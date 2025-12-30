const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const mixer = mixitup(".project__grid");

const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 500,
};

// header container
ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__content h4", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content .btn", {
  ...scrollRevealOption,
  delay: 500,
});

// about container
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content p", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content h4", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__btns", {
  ...scrollRevealOption,
  delay: 500,
});

// service container
ScrollReveal().reveal(".service__card", {
  duration: 500,
  interval: 500,
});

// blog container
ScrollReveal().reveal(".blog__card", {
  ...scrollRevealOption,
  interval: 500,
});



// Mobile Sale Dashboard Countdown - NO SPAN TAG USED
const launchDate = new Date("2026-07-15T00:00:00").getTime(); // 👈 ඔයාගේ launch date එක දාන්න

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const button = document.getElementById("mobileDashboardBtn");

  if (!button) return;

  if (distance < 0) {
    // Launched!
    button.innerHTML = '<i class="ri-links-line"></i> Visit Now';
    button.href = "mobile-dashboard.html"; // Real link when live
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  // Direct innerHTML update - no span needed
  button.innerHTML = `<i class="ri-time-line"></i> ${days}D ${hours}H ${minutes}M`;
}

// Run immediately (no loading delay)
updateCountdown();

// Update every minute
setInterval(updateCountdown, 60000); 