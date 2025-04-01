document.addEventListener("DOMContentLoaded", () => {
  // Handle opening the appropriate modal when a More Images button is clicked
  const moreImagesButtons = document.querySelectorAll(".more-img");

  moreImagesButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const modalOverlay = document.getElementById(targetId);
      if (modalOverlay) {
        modalOverlay.style.display = "flex";
        // Initialize slideshow for this modal
        initializeSlideshow(modalOverlay);
      }
    });
  });

  // Handle closing modals
  const closeButtons = document.querySelectorAll(".modal-overlay .close");
  closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      closeBtn.closest(".modal-overlay").style.display = "none";
    });
  });

  // Close modal if clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.style.display = "none";
    }
  });

  // Function to initialize slideshow functionality within a specific modal
  function initializeSlideshow(modalOverlay) {
    const prevButton = modalOverlay.querySelector(".prev");
    const nextButton = modalOverlay.querySelector(".next");
    const slides = modalOverlay.querySelectorAll(".slide-container .slide");
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === index);
      });
    }

    // Remove previous event listeners if any (optional cleanup)
    // For simplicity, we assume the modal is reinitialized each time it opens.

    if (prevButton) {
      prevButton.onclick = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      };
    }

    if (nextButton) {
      nextButton.onclick = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      };
    }

    // Reset to the first slide when the modal opens
    currentSlide = 0;
    showSlide(currentSlide);
  }
});
