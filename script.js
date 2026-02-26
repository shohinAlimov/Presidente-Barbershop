// ═══════════════════════════════
// PRESIDENTE BARBERSHOP
// ═══════════════════════════════

// ── Data ──
const branchData = {
  c1: {
    name: "Presidente Ц1",
    barbers: [
      { name: "Алишер", specialty: "Классические стрижки" },
      { name: "Рустам", specialty: "Фейды и современные стрижки" },
      { name: "Джамшид", specialty: "Борода и усы" },
      { name: "Бехзод", specialty: "Комплексные услуги" },
    ],
  },
  parkwood: {
    name: "Presidente Parkwood",
    barbers: [
      { name: "Санжар", specialty: "Фейды и дизайн" },
      { name: "Отабек", specialty: "Классические стрижки" },
      { name: "Фаррух", specialty: "Борода и королевское бритьё" },
      { name: "Азиз", specialty: "Комплексные VIP-услуги" },
      { name: "Шерзод", specialty: "Детские стрижки" },
    ],
  },
};

// ── DOM refs ──
const header = document.getElementById("header");
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const branchBtns = document.querySelectorAll("[data-branch]");
const barbersPanel = document.getElementById("barbersPanel");
const barbersPanelTitle = document.getElementById("barbersPanelTitle");
const barbersGrid = document.getElementById("barbersGrid");
const bookingOverlay = document.getElementById("bookingOverlay");
const modalClose = document.getElementById("modalClose");
const modalSubtitle = document.getElementById("modalSubtitle");
const bookingForm = document.getElementById("bookingForm");

let activeBranch = null;

// ── Header scroll ──
window.addEventListener("scroll", () => {
  header.classList.toggle("header--scrolled", window.scrollY > 80);
});

// ── Mobile menu ──
burgerBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Close mobile menu on link click
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("active"));
});

// ── Branch selection ──
branchBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const branchId = btn.dataset.branch;

    // Toggle same branch off
    if (activeBranch === branchId) {
      activeBranch = null;
      branchBtns.forEach((b) => b.classList.remove("active"));
      barbersPanel.classList.remove("visible");
      return;
    }

    activeBranch = branchId;

    // Update active state
    branchBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Render barbers
    renderBarbers(branchId);
  });
});

function renderBarbers(branchId) {
  const branch = branchData[branchId];
  barbersPanelTitle.textContent = `Мастера · ${branch.name}`;
  barbersGrid.innerHTML = "";

  branch.barbers.forEach((barber, i) => {
    const card = document.createElement("button");
    card.className = "barber-card";
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="barber-card__avatar">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <span class="barber-card__name">${barber.name}</span>
      <span class="barber-card__specialty">${barber.specialty}</span>
      <span class="barber-card__cta">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Записаться
      </span>
    `;
    card.addEventListener("click", () => openBooking(branch.name, barber.name));
    barbersGrid.appendChild(card);
  });

  barbersPanel.classList.add("visible");
}

// ── Booking modal ──
function openBooking(branchName, barberName) {
  modalSubtitle.textContent = `${barberName} · филиал ${branchName}`;
  bookingOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBooking() {
  bookingOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeBooking);

bookingOverlay.addEventListener("click", (e) => {
  if (e.target === bookingOverlay) closeBooking();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBooking();
});

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closeBooking();
  bookingForm.reset();
});

// ── Scroll animations (IntersectionObserver) ──
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".card, .about__stat-card, .about__text, .section-header",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
};

document.addEventListener("DOMContentLoaded", animateOnScroll);
