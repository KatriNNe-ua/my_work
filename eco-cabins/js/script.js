// let documentActions = (e) => {
//   const targetElement = e.target;

//   if (targetElement.closest(".header__btn-menu")) {
//     document.documentElement.classList.toggle("open-menu");
//   }
// };

// document.addEventListener("click", documentActions);

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  // .icon-menu це клас кнопки при кліку на яку буде спрацьовувати код додаватись до тегу html клас menu-open
  if (targetElement.closest(".header__btn-menu")) {
    document.documentElement.classList.toggle("open-menu");
    e.preventDefault();
  }
});

const swiper = new Swiper(".materialen__slider", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
	clickable: true
  },

});

window.addEventListener("scroll", function () {
  scrollY > 0
    ? document.querySelector(".header").classList.add("scroll")
    : document.querySelector(".header").classList.remove("scroll");
});
