// ===============================
// WEBSITE CORE + BOOK SLIDER FINAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     NAVIGATION
  =============================== */
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    navLinks.forEach(l => l.classList.remove("active"));

    const page = document.getElementById(pageId);
    if (page) page.classList.add("active");

    const link = document.querySelector(`[data-page="${pageId}"]`);
    if (link) link.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, "", `#${pageId}`);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  const initialPage = location.hash.replace("#", "") || "about";
  showPage(initialPage);

  /* ===============================
     BOOK SLIDER (ID BASED – FIX)
  =============================== */
  const slider = document.querySelector(".carouselservice4");
  const slides = document.querySelectorAll(".carouselservice4 .slides");
  const bookCards = document.querySelectorAll(".book-card");

  let slideIndex = 0;
  let autoSlide;

  if (slides.length) {
    slides.forEach(s => s.classList.remove("active"));
    slides[0].classList.add("active");
  }

  function showSlides() {
    slides.forEach(s => s.classList.remove("active"));

    slideIndex++;
    if (slideIndex >= slides.length) slideIndex = 0;

    slides[slideIndex].classList.add("active");
    autoSlide = setTimeout(showSlides, 4000);
  }

  if (slides.length) {
    autoSlide = setTimeout(showSlides, 4000);
  }

  // CLICK BOOK → CARI SLIDE SESUAI data-book
  bookCards.forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      const bookId = card.dataset.book;
      if (!bookId) return;

      clearTimeout(autoSlide);

      slides.forEach((slide, i) => {
        slide.classList.remove("active");

        if (slide.dataset.book === bookId) {
          slide.classList.add("active");
          slideIndex = i;
        }
      });

      if (slider) {
        slider.scrollIntoView({ behavior: "smooth" });
      }

      autoSlide = setTimeout(showSlides, 4000);
    });
  });

  /* ===============================
     FAQ
  =============================== */
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-question");
    if (!q) return;

    q.addEventListener("click", () => {
      document.querySelectorAll(".faq-item").forEach(i => {
        if (i !== item) i.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

});

