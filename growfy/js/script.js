"use strict";

window.addEventListener("load", windowLoad);

function windowLoad() {
  const html = document.documentElement;
  if (html) html.classList.add("loaded");
  document.addEventListener("click", documentActions);
  scrollActions();
}

function documentActions(e) {
  const el = e.target;
  if (el.closest(".icon-menu")) {
    const html = document.documentElement;
    html.classList.toggle("menu-open");
    html.classList.toggle("lock");
  }
}

// window.addEventListener("scroll", function () {
//   scrollY > 40
//     ? document.querySelector(".header").classList.add("scroll")
//     : document.querySelector(".header").classList.remove("scroll");
// });

function scrollActions() {
  window.addEventListener("scroll", scrollAction);
  startObserver();
}

function startObserver() {
  const isTablet = window.innerWidth < 992;
  const options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    // Відсоток від розміру об'єкту.
    // При появі якого спрацьовує подія
    // Де 0 це будь яка поява
    // 1 це повна поява об'кта в в'юпорті
    threshold: isTablet ? 0.1 : 0.2,
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const currentElement = entry.target;
      if (entry.isIntersecting) {
        currentElement.classList.add("--animate");
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);

  const animElements = document.querySelectorAll('[class*="--anim"]');
  animElements.forEach((animElement) => {
    observer.observe(animElement);
  });
}

function scrollAction() {
  const header = document.querySelector(".header");
  if (header) {
    header.classList.toggle("scroll", scrollY > 40);
  }
}
