// ═══════════════════════════════
// PRESIDENTE BARBERSHOP - JAVASCRIPT
// ═══════════════════════════════

// ═══════════════════════════════
// HEADER SCROLL EFFECT
// ═══════════════════════════════
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});
