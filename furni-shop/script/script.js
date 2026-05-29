"use strict";

window.addEventListener("load", windowLoad);

function windowLoad() {
  const html = document.documentElement;
  if (html) html.classList.add("loaded");
  document.addEventListener("click", documentActions);
  startObserver();
  slidersInit();
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

function slidersInit() {
  if (document.querySelector(".new__slider")) {
    const swiper = new Swiper(".new__slider", {
      direction: "horizontal",
      autoHeight: true,
      slidesPerView: 1.5,
      spaceBetween: 18,

      breakpoints: {
       400: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2.5,
        },
        900: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
      },
    });
  }

   if (document.querySelector(".all__slider")) {
     const swiper = new Swiper(".all__slider", {
       direction: "horizontal",
       autoHeight: true,
       slidesPerView: 2,
       spaceBetween: 18,

       breakpoints: {
         500: {
           slidesPerView: 3,
         },
         768: {
           slidesPerView: 3,
         },
         900: {
           slidesPerView: 4,
           spaceBetween: 30,
         },
       },
       // Navigation arrows
       navigation: {
         nextEl: ".all__swiper-button-next",
         prevEl: ".all__swiper-button-prev",
       },
       pagination: {
         el: ".all__swiper-pagination",
         clickable: true,
       },
     });
   }
   if (document.querySelector(".about__slider")) {
     const swiper = new Swiper(".about__slider", {
       direction: "horizontal",
       autoHeight: true,
       slidesPerView: 1,
       spaceBetween: 10,
       // Navigation arrows
       navigation: {
         nextEl: ".about__swiper-button-next",
         prevEl: ".about__swiper-button-prev",
       },
       pagination: {
         el: ".about__swiper-pagination",
         clickable: true,
       },
     });
   }
}