"use strict";

window.addEventListener("load", windowLoad);

function windowLoad() {
  const html = document.documentElement;
  if (html) html.classList.add("loaded");
  document.addEventListener("click", documentActions);
  startObserver();
}

function documentActions(e) {
  const el = e.target;
  if (el.closest(".icon-menu")) {
    const html = document.documentElement;
    html.classList.toggle("menu-open");
    html.classList.toggle("lock");
  }
}

function startObserver() {
  const isTablet = window.innerWidth < 992;
  const options = {
    root: null,
    rootMargin: isTablet ? "0px 0px -10% 0px" : "0px 0px -20% 0px",
    threshold: 0,
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const currentElement = entry.target;
if (entry.isIntersecting) {
  currentElement.classList.add("--animate");
  observer.unobserve(entry.target);
}

    });
  };
  const observer = new IntersectionObserver(callback, options);

  const animElements = document.querySelectorAll('[class*="--anim"]');
  animElements.forEach((animElement) => {
    observer.observe(animElement);
  });
}

