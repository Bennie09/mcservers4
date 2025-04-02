document.addEventListener("DOMContentLoaded", () => {
  const serverIP = "should-tourist.gl.joinmc.link";
  const statusElement = document.getElementById("server-status");
  const playerCountElement = document.getElementById("player-count");
  const onlineIcon = document.getElementById("cloud");
  const offlineIcon = document.getElementById("cloud-off");
  const errorIcon = document.getElementById("error");

  let previousStatus = null;

  function showToast(message, status) {
    const toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) return;

    const toastDiv = document.createElement("div");
    toastDiv.className = `toast ${
      status === "online" ? "status-online" : "status-offline"
    }`;
    toastDiv.setAttribute("role", "alert");
    toastDiv.setAttribute("aria-live", "assertive");
    toastDiv.setAttribute("aria-atomic", "true");

    toastDiv.innerHTML = `
      <div class="toast-header">
        <strong class="me-auto">Server Notification</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;

    toastContainer.appendChild(toastDiv);
    const toastInstance = new bootstrap.Toast(toastDiv);
    toastInstance.show();
  }

  async function checkServerStatus() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    onlineIcon.style.display = "none";
    offlineIcon.style.display = "none";
    errorIcon.style.display = "none";

    try {
      const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.online) {
        statusElement.textContent = "Online";
        statusElement.className = "status-online";
        statusElement.style.color = "#00cd00";
        onlineIcon.style.display = "block";

        const online = data.players?.online || 0;
        const max = data.players?.max || 0;
        playerCountElement.textContent = `Players: ${online}/${max}`;
        playerCountElement.className = "status-online";

        if (previousStatus === null) {
          if (!localStorage.getItem("initialToastDisplayed")) {
            showToast("Server is now ONLINE", "online");
            localStorage.setItem("initialToastDisplayed", "true");
          }
        } else if (previousStatus !== "online") {
          showToast("Server is now ONLINE", "online");
        }
        previousStatus = "online";
      } else {
        statusElement.textContent = "Offline";
        statusElement.className = "status-offline";
        statusElement.style.color = "#e81c1c";
        playerCountElement.textContent = `Players: 0/69420`;
        playerCountElement.className = "status-offline";
        offlineIcon.style.display = "block";

        if (previousStatus === null) {
          if (!sessionStorage.getItem("initialToastDisplayed")) {
            showToast("Server is now OFFLINE", "offline");
            sessionStorage.setItem("initialToastDisplayed", "true");
          }
        } else if (previousStatus !== "offline") {
          showToast("Server is now OFFLINE", "offline");
        }
        previousStatus = "offline";
      }
    } catch (error) {
      statusElement.textContent = "Status Unknown";
      statusElement.style.color = "#e81c1c";
      playerCountElement.textContent = `Players: 0/69420`;
      errorIcon.style.display = "block";

      if (previousStatus === null) {
        if (!sessionStorage.getItem("initialToastDisplayed")) {
          showToast("Server status is UNKNOWN", "offline");
          sessionStorage.setItem("initialToastDisplayed", "true");
        }
      } else if (previousStatus !== "unknown") {
        showToast("Server status is UNKNOWN", "offline");
      }
      previousStatus = "unknown";
    }
  }

  checkServerStatus();
  setInterval(checkServerStatus, 10000);
});
