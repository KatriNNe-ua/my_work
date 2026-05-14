"use strict";

window.addEventListener("load", windowLoad);

function windowLoad() {
  const html = document.documentElement;
  if (html) html.classList.add("loaded");
  document.addEventListener("click", documentActions);
  scrollActions();
  slidersInit();
}

function documentActions(e) {
  const el = e.target;
  if (el.closest(".actions__menu")) {
    const html = document.documentElement;
    html.classList.toggle("open-menu");
    html.classList.toggle("lock");
  }
}

function scrollActions() {
  startObserver();
}

function startObserver() {
  const options = {
    root: null,
    rootMargin: "0px 0px -15% 0px",
    threshold: 0,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const currentElement = entry.target;
      if (entry.isIntersecting) {
        currentElement.classList.add("--animate");
		observer.unobserve(currentElement);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  const animElements = document.querySelectorAll('[class*="--anim"]');

  function initObserver() {
    animElements.forEach((element) => {
      observer.observe(element);
    });
  }

if (window.scrollY > 0) {
  initObserver();
  return;
}

window.addEventListener(
  "scroll",
  () => {
    initObserver();
  },
  { once: true },
);

 
}

function slidersInit() {
  if (document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      autoHeight: true,
      slidesPerView: 1.2,
      spaceBetween: 20,
      // If we need pagination
      pagination: {
        el: ".pagination",
        clickable: true,
      },
      breakpoints: {
        550: {
          slidesPerView: 1.5,
        },
        900: {
          spaceBetween: 48,
        },
      },
    });
  }
}
