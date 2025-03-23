document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const images = document.querySelectorAll(".news-section img");

  images.forEach((img) => {
    img.addEventListener("click", function () {
      modal.classList.add("active");
      modalImg.src = this.src;
    });
  });

  modal.addEventListener("click", function () {
    modal.classList.remove("active");
  });
});
