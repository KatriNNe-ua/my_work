"use strict";

window.addEventListener("load", windowLoad);

const laptopScreen = window.matchMedia("(min-width: 992px)");

gsap.registerPlugin(ScrollTrigger);

function windowLoad() {
  const html = document.documentElement;
  if (html) html.classList.add("loaded");
  document.addEventListener("click", documentActions);

  slidersInit();
  if (laptopScreen.matches) {
    slidesPlugin(0);
    animation();
  }
}

function animation() {
  const tl = gsap.timeline();
  const text = new SplitType(".hero__title", {
    types: "chars",
  });

  tl.from(".header", {
    y: -200,
    opacity: 0,
    duration: 1,
  })
    .from(text.chars, {
      y: -100,
      opacity: 0,
      stagger: 0.3,
    })
    .from(".hero__header", {
      y: 100,
      opacity: 0,
      duration: 1,
    })
    .from(".hero__text", {
      y: -100,
      opacity: 0,
      duration: 1,
    });
  //=======================================

  gsap.from(".hero__left-bottom", {
    scale: 0,
    transformOrigin: "left bottom",
    opacity: 0,
    duration: 1,

    scrollTrigger: {
      trigger: ".hero__left-bottom",
      start: "top 60%",
    },
  });
  gsap.from(".hero__arrow", {
    y: -200,
    opacity: 0,
    duration: 1,

    scrollTrigger: {
      trigger: ".hero__left-bottom",
      start: "top 70%",
      scrub: true,
    },
  });
  //===========================================
  gsap.from(".plants", {
    y: 150,
    opacity: 0,
    duration: 1,

    scrollTrigger: {
      trigger: ".plants",
      start: "top 70%",
    },
  });

  gsap.from(".new", {
    y: 150,
    opacity: 0,
    duration: 1,

    scrollTrigger: {
      trigger: ".new",
      start: "top 70%",
    },
  });

  gsap.from(".collection", {
    y: 150,
    opacity: 0,
    duration: 1,

    scrollTrigger: {
      trigger: ".collection",
      start: "top 70%",
    },
  });

  gsap.from(".quality", {
    y: 150,
    opacity: 0,
    duration: 1,

    scrollTrigger: {
      trigger: ".quality",
      start: "top 70%",
    },
  });

   gsap.from(".item-quality", {
     x: -100,
     opacity: 0,
     duration: 1,
     stagger: 0.2,

     scrollTrigger: {
       trigger: ".quality__question",
       start: "top 70%",
     },
   });
}

function slidesPlugin(numActiveSlide = 0) {
  const slides = document.querySelectorAll(".kinds__item");
  if (numActiveSlide >= 0 && numActiveSlide < slides.length) {
    slides[numActiveSlide].classList.add("kinds__item--active");
  } else slides[0].classList.add("kinds__item--active");

  const container = document.querySelector(".kinds");
  container.addEventListener("click", addActive);
  function addActive(e) {
    const el = e.target.closest(".kinds__item");
    if (!el) return;
    slides.forEach((item) => {
      item.classList.remove("kinds__item--active");
    });
    el.classList.add("kinds__item--active");
    truncateText(".kinds__title");
  }
}

function truncateText(selector, maxLength = 7) {
  const items = document.querySelectorAll(selector);

  items.forEach((item) => {
    const originalText = item.dataset.originalText || item.textContent.trim();

    item.dataset.originalText = originalText;

    const slide = item.closest(".kinds__item");

    if (slide.classList.contains("kinds__item--active")) {
      item.textContent = originalText;
      item.style.whiteSpace = "";
    } else {
      item.textContent =
        originalText.length > maxLength
          ? originalText.slice(0, maxLength) + "..."
          : originalText;
      item.style.whiteSpace = "nowrap";
    }
  });
}

function documentActions(e) {
  const targetEl = e.target;
  if (targetEl.closest(".icon-menu")) {
    const html = document.documentElement;
    html.classList.toggle("menu-open");
    html.classList.toggle("lock");
  }

  //=====================================
  const button = targetEl.closest(".item-quality__btn");

  if (!button) return;

  const item = button.closest(".item-quality");
  const content = item.querySelector(".item-quality__content");

  if (content.classList.contains("_slide")) return;

  item.classList.toggle("--active");

  _slideToggle(content, 500);
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
      slidesPerView: 1.2,
      spaceBetween: 10,

      breakpoints: {
        430: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        670: {
          slidesPerView: 2,
        },
        836: {
          slidesPerView: 2.5,
        },
        1165: {
          slidesPerView: 3,
        },
      },

      pagination: {
        el: ".new__pagination",
        clickable: true,
      },
    });
  }

  //    if (document.querySelector(".all__slider")) {
  //      const swiper = new Swiper(".all__slider", {
  //        direction: "horizontal",
  //        autoHeight: true,
  //        slidesPerView: 2,
  //        spaceBetween: 18,

  //        breakpoints: {
  //          500: {
  //            slidesPerView: 3,
  //          },
  //          768: {
  //            slidesPerView: 3,
  //          },
  //          900: {
  //            slidesPerView: 4,
  //            spaceBetween: 30,
  //          },
  //        },
  //        // Navigation arrows
  //        navigation: {
  //          nextEl: ".all__swiper-button-next",
  //          prevEl: ".all__swiper-button-prev",
  //        },
  //        pagination: {
  //          el: ".all__swiper-pagination",
  //          clickable: true,
  //        },
  //      });
  //    }
  //    if (document.querySelector(".about__slider")) {
  //      const swiper = new Swiper(".about__slider", {
  //        direction: "horizontal",
  //        autoHeight: true,
  //        slidesPerView: 1,
  //        spaceBetween: 10,
  //        // Navigation arrows
  //        navigation: {
  //          nextEl: ".about__swiper-button-next",
  //          prevEl: ".about__swiper-button-prev",
  //        },
  //        pagination: {
  //          el: ".about__swiper-pagination",
  //          clickable: true,
  //        },
  //      });
  //    }
}
//=============================================
// Допоміжні модулі плавного розкриття та закриття об'єкта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      // Створюємо подію
      document.dispatchEvent(
        new CustomEvent("slideUpDone", {
          detail: {
            target: target,
          },
        }),
      );
    }, duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      // Створюємо подію
      document.dispatchEvent(
        new CustomEvent("slideDownDone", {
          detail: {
            target: target,
          },
        }),
      );
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
