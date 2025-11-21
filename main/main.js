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

const mixer = mixitup(".project__grid", {
  animation: {
    duration: 400,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
});

const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  effect: 'fade',
  autoplay: {
    delay: 3000,
  }
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000, // Slower for dramatic neon entrance
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

// header container
ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  scale: 0.9,
  delay: 200,
});

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 400,
});

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 600,
});

ScrollReveal().reveal(".header__content .about__btns", {
  ...scrollRevealOption,
  delay: 800,
  interval: 150,
});

// banner cards
ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  interval: 300,
  origin: "left",
});

// profile container
ScrollReveal().reveal(".profile__container .wild-h3", {
  ...scrollRevealOption,
  scale: 0.5,
  delay: 200,
});

ScrollReveal().reveal(".profile__avatar", {
  ...scrollRevealOption,
  scale: 0.8,
  delay: 400,
  rotate: { z: 360 },
});

ScrollReveal().reveal(".profile__name", {
  ...scrollRevealOption,
  delay: 600,
});

ScrollReveal().reveal(".profile__bio", {
  ...scrollRevealOption,
  delay: 800,
});

ScrollReveal().reveal(".profile__stats .profile__stat", {
  ...scrollRevealOption,
  delay: 1000,
  interval: 200,
  scale: 0.8,
});

// project container
ScrollReveal().reveal(".project__header .section__header", {
  ...scrollRevealOption,
  delay: 200,
});

ScrollReveal().reveal(".project__nav", {
  ...scrollRevealOption,
  delay: 400,
  interval: 150,
});

ScrollReveal().reveal(".project__card", {
  ...scrollRevealOption,
  delay: 600,
  interval: 200,
  scale: 0.9,
});

// service container
ScrollReveal().reveal(".service__subheader", {
  ...scrollRevealOption,
  origin: "top",
  delay: 200,
});

ScrollReveal().reveal(".service__header", {
  ...scrollRevealOption,
  delay: 400,
});

ScrollReveal().reveal(".section__description", {
  ...scrollRevealOption,
  delay: 600,
});

ScrollReveal().reveal(".service__card", {
  duration: 1000,
  interval: 300,
  origin: "bottom",
  scale: 0.9,
});

// footer
ScrollReveal().reveal(".footer__col", {
  ...scrollRevealOption,
  interval: 300,
  origin: "left",
});

// Add neon particle effect on load (simple canvas-based)
window.addEventListener('load', () => {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)` // Neon blues/greens
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
    });
    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  }
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

<script>
// MixItUp + Search + Filter + Count + Dark Mode
document.addEventListener("DOMContentLoaded", function () {
  // Initialize MixItUp
  var mixer = mixitup('#mix-container', {
    selectors: { target: '.youtube__card' },
    animation: { duration: 400 }
  });

  // Filter buttons
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter.active').classList.remove('active');
      btn.classList.add('active');
    });
  });

  // Search
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.youtube__card').forEach(card => {
      const title = card.getAttribute('data-title');
      card.style.display = title.includes(query) ? 'block' : 'none';
    });
    updateCount();
  });

  // Update count
  function updateCount() {
    const visible = document.querySelectorAll('.youtube__card[style*="block"], .youtube__card:not([style])').length;
    document.getElementById('count').textContent = visible;
  }

  // Dark mode toggle
  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggle.innerHTML = isDark ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.innerHTML = '<i class="ri-sun-line"></i>';
  }
});
</script>
