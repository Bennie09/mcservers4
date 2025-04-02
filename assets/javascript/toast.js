const toastBtn = document.getElementById("toastBtn");
const toastContainer = document.querySelector(".toast-container");
const toastTemplate = document.getElementById("toastTemplate");

toastBtn.addEventListener("click", () => {
  // Clone the toast template's content
  const toastClone = toastTemplate.content.cloneNode(true);
  const newToast = toastClone.querySelector(".toast");

  // Optionally, customize the toast (e.g., update time or text)

  // Append the new toast to the container
  toastContainer.appendChild(newToast);

  // Initialize and show the new toast
  const toastInstance = new bootstrap.Toast(newToast);
  toastInstance.show();
});
