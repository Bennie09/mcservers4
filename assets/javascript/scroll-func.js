window.onscroll = function () {
  if (window.scrollY > 0) {
    document.querySelector(".navbar-bottom").style.top = "0";
  } else {
    document.querySelector(".navbar-bottom").style.top = "";
  }
};
