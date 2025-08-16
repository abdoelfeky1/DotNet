var preloader = document.getElementsByClassName("preloader")[0];
var header = document.getElementsByClassName("header")[0];

var offers = document.getElementsByClassName("offers__item");
var types = document.getElementsByClassName("service-type");
var btnnext = document.getElementById("btn-next");
var btnback = document.getElementById("btn-back");
var number = document.getElementsByClassName("number");
var slider = document.getElementsByClassName("slider-container")[0];

window.onload = function () {
  setTimeout(function () {
    preloader.style.transition = "opacity 300ms";
    preloader.style.opacity = 0;

    setTimeout(function () {
      preloader.style.display = "none";
    }, 400);
  }, 1000);
};

window.onscroll = function () {
  if (scrollY >= 450) {
    header.classList.add("fixed-bar");
    offers[0].style.animation = "fadeInUp 1.5s forwards";
    offers[1].style.animation = "fadeInUp 1.5s .4s forwards";
    offers[2].style.animation = "fadeInUp 1.5s .8s forwards";
  } else {
    header.classList.remove("fixed-bar");
  }
  if (scrollY >= 2250) {
    types[0].style.animation = "fadeInUp 1.5s forwards";
    types[1].style.animation = "fadeInUp 1.5s .4s forwards";
    types[2].style.animation = "fadeInUp 1.5s .8s forwards";
    types[3].style.animation = "fadeInUp 1.5s 1.2s forwards";
  }
};
var currentIndex = 0;

btnnext.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % 2;

  if (currentIndex === 0) {
    slider.style.animation = "none";
    slider.offsetHeight;
    slider.style.animation = "fadeInRight 1.5s forwards";

    number[0].style.color = "black";
    number[1].style.color = "#be9278";
  } else {
    slider.style.animation = "none";
    slider.offsetHeight;
    slider.style.animation = "fadeInRight 1.5s forwards";

    number[1].style.color = "black";
    number[0].style.color = "#be9278";
  }
});

btnback.addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + 2) % 2;

  if (currentIndex === 0) {
    slider.style.animation = "none";
    slider.offsetHeight;
    slider.style.animation = "fadeInLeft 1.5s forwards";

    number[0].style.color = "black";
    number[1].style.color = "#be9278";
  } else {
    slider.style.animation = "none";
    slider.offsetHeight;
    slider.style.animation = "fadeInLeft 1.5s forwards";

    number[1].style.color = "black";
    number[0].style.color = "#be9278";
  }
});
