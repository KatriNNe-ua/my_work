"use strict";

window.onload = function () {
  document.documentElement.classList.add("loaded");

  const parallax = document.querySelector(".parallax");
  const sheep = document.querySelector(".ocean__fish");
  if (!parallax) return;

  // Всі шари з налаштуваннями швидкості
  const layers = parallax.querySelectorAll("[data-speed]");

  /*
  =====================================================
  1. ЗМІННІ
  =====================================================
  */

  let scrollPercent = 0;

  // Цільові координати миші
  let mouseX = 0;
  let mouseY = 0;

  // Поточні координати (інерція)
  let currentX = 0;
  let currentY = 0;

  const smooth = 0.05;
  let ticking = false;

  /*
  =====================================================
  2. ГОЛОВНЕ ОНОВЛЕННЯ
  =====================================================
  */

  function updateParallax() {
    layers.forEach((layer) => {
      // Швидкість скролу
      const scrollSpeed = parseFloat(layer.dataset.speed) || 0;

      // Швидкість миші
      const mouseSpeed = parseFloat(layer.dataset.mouseSpeed) || 0;

      /*
      ============================
      SCROLL (%)
      ============================
      */

      const scrollOffset = scrollPercent * scrollSpeed;

      /*
      ============================
      MOUSE (%)
      ============================
      */

      const mouseOffsetX = mouseSpeed ? currentX / mouseSpeed : 0;
      const mouseOffsetY = mouseSpeed ? currentY / mouseSpeed : 0;

      /*
      ============================
      ФІНАЛЬНИЙ TRANSFORM
      ============================
      */

      layer.style.transform = `translate3d(${mouseOffsetX}%, ${scrollOffset + mouseOffsetY}%, 0)`;
    });

    ticking = false;
  }

  /*
  =====================================================
  3. ПЛАВНА ІНЕРЦІЯ МИШІ
  =====================================================
  */

  function animateMouse() {
    currentX += (mouseX - currentX) * smooth;
    currentY += (mouseY - currentY) * smooth;

    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }

    requestAnimationFrame(animateMouse);
  }

  animateMouse();

  /*
  =====================================================
  4. SCROLL
  =====================================================
  */

  window.addEventListener("scroll", () => {
    const height = parallax.offsetHeight;
    const scrollTop = window.scrollY;

    // Переводимо в %
    scrollPercent = (scrollTop / height) * 100;

    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
    const rect = sheep.getBoundingClientRect();

    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      sheep.style.transform = `translateX(${scrollTop * 0.2}px)`;
    }
  });

  /*
  =====================================================
  5. MOUSEMOVE (у % від центру)
  =====================================================
  */

  parallax.addEventListener("mousemove", (e) => {
    const rect = parallax.getBoundingClientRect();

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const coordX = e.clientX - rect.left - centerX;
    const coordY = e.clientY - rect.top - centerY;

    // Переводимо в %
    mouseX = (coordX / rect.width) * 100;
    mouseY = (coordY / rect.height) * 100;
  });

  function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // випадковий розмір
    const size = Math.random() * 20 + 10; // 10–30px
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    // випадкова позиція по горизонталі
    bubble.style.left = Math.random() * window.innerWidth + "px";

    // випадкова тривалість анімації
    bubble.style.animationDuration = Math.random() * 5 + 5 + "s";

    document.querySelector(".bubbles").appendChild(bubble);

    // видалення після завершення
    setTimeout(() => {
      bubble.remove();
    }, 100000);
  }

  // запуск кожні 300 мс
  setInterval(createBubble, 900);
};
