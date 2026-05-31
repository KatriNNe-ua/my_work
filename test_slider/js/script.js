"use strict";

window.addEventListener("load", windowLoad);

gsap.registerPlugin(ScrollTrigger);

function windowLoad() {
  const html = document.documentElement;
  if (html) html.classList.add("loaded");

  const slider = document.querySelector(".slider");
  if (slider) slider.addEventListener("click", documentActions);

  scrollAction();
}

function documentActions(e) {
  const icon = e.target.closest(".slider__info");

  if (!icon) return;

  const card = icon.closest(".slider__card");

  if (card) {
    card.classList.toggle("more");
  }
}

function scrollAction() {
  const thumb = document.querySelector(".scroll__thumb");
  const track = document.querySelector(".scroll__track");
  const progressLine = document.querySelector(".scroll__progress");

  const prevBtn = document.querySelector(".controller-slider__prev");
  const nextBtn = document.querySelector(".controller-slider__next");

  const wrapper = document.querySelector(".slider__wrapper");
  const page = document.querySelector(".page");

  const cards = gsap.utils.toArray(".slider__card");

  if (!cards.length || !wrapper) return;

  let isDragging = false;
  let currentCard = 0;
  let trigger;

  const startOffset = 10;

  let overlap = 0;
  let scrollLength = 0;

  // =========================================

  function recalcSlider() {
    const cardWidth = cards[0].offsetWidth;

    const styles = getComputedStyle(wrapper);

    overlap = cardWidth;

    const lastCardStart = (cards.length - 1) * startOffset;

    const lastCardEnd = (cards.length - 1) * overlap;

    scrollLength = lastCardStart + lastCardEnd;

    page.style.minHeight = `${scrollLength + window.innerHeight}px`;
  }

  recalcSlider();

  // ===========================================

  if (thumb && track) {
    thumb.addEventListener("pointerdown", () => {
      isDragging = true;
    });

    window.addEventListener("pointerup", () => {
      isDragging = false;
    });

    window.addEventListener("pointermove", (e) => {
      if (!isDragging || !trigger) return;

      const rect = track.getBoundingClientRect();

      let progress = (e.clientX - rect.left) / rect.width;

      progress = Math.max(0, Math.min(1, progress));

      const scrollPosition =
        trigger.start + (trigger.end - trigger.start) * progress;

      window.scrollTo({
        top: scrollPosition,
        behavior: "auto",
      });
    });
  }

  // ===============================================

  cards.forEach((card, i) => {
    gsap.set(card, {
      x: i * startOffset,
      zIndex: i + 1,
      "--light": 0.6,
    });
  });

  // =============================================

  trigger = ScrollTrigger.create({
    trigger: ".hero__block",

    start: "top top",

    end: () => {
      recalcSlider();
      return `+=${scrollLength}`;
    },

    scrub: 1,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,

    onUpdate: (self) => {
      if (thumb && track) {
        const trackWidth = track.offsetWidth - thumb.offsetWidth;
        const thumbX = self.progress * trackWidth;

        gsap.set(thumb, {
          x: self.progress * trackWidth,
        });

		 track.style.setProperty(
       "--progress",
       `${thumbX + thumb.offsetWidth / 2}px`,
     );
      }

      const moveX = self.progress * scrollLength;

      const activeIndex = Math.min(
        Math.round(moveX / overlap),
        cards.length - 1,
      );

      currentCard = activeIndex;

      if (prevBtn) {
        prevBtn.disabled = currentCard === 0;
      }

      if (nextBtn) {
        nextBtn.disabled = currentCard === cards.length - 1;
      }

      cards.forEach((card, i) => {
        const initialX = i * startOffset;

        let currentX = initialX - moveX;

        const stackedX = -(i * overlap);

        if (currentX <= stackedX) {
          currentX = stackedX;
        }

        const distanceFromActive = Math.abs(i - activeIndex);

        const lightness = Math.min(distanceFromActive * 0.09, 0.9);

        gsap.set(card, {
          x: currentX,
          "--light": lightness,
        });
      });
    },
  });

  // ======================================

  window.addEventListener("resize", () => {
    recalcSlider();
    ScrollTrigger.refresh();
  });

  // ======================================

  function scrollToCard(index) {
    index = Math.max(0, Math.min(index, cards.length - 1));

    const moveX = index * overlap;

    const progress = moveX / scrollLength;

    const scrollPosition =
      trigger.start + (trigger.end - trigger.start) * progress;

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      scrollToCard(currentCard + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      scrollToCard(currentCard - 1);
    });
  }
}
