window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 60) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});
