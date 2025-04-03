document.addEventListener("DOMContentLoaded", () => {
  const joinButton = document.querySelector(".join-btn");
  const overlay = document.querySelector(".join-overlay");
  const closeButton = document.querySelector(".close");
  const ipInfo = document.querySelector(".ip-info");

  overlay.style.display = "none";

  joinButton.addEventListener("click", () => {
    overlay.style.display = "flex";
  });

  closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  document.querySelectorAll(".copy").forEach((copyBtn) => {
    copyBtn.addEventListener("click", () => {
      let textToCopy = copyBtn.previousElementSibling.textContent.trim();

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          let tooltip = document.createElement("span");
          tooltip.className = "tooltip";
          tooltip.textContent = "Copied!";
          copyBtn.appendChild(tooltip);

          setTimeout(() => {
            tooltip.remove();
          }, 1500);
        })
        .catch((err) => {
          console.error("Failed to copy text:", err);
        });
    });
  });
});
