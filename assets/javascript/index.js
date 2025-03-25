document.addEventListener("DOMContentLoaded", () => {
  async function checkServerStatus() {
    const serverIP = "quite-calculate.gl.joinmc.link";
    const statusElement = document.getElementById("server-status");
    const playerCountElement = document.getElementById("player-count");
    const onlinePlayersElement = document.getElementById("online-players");
    const onlineIcon = document.getElementById("cloud");
    const offlineIcon = document.getElementById("cloud-off");
    const errorIcon = document.getElementById("error");

    // Verify all required elements are present
    if (
      !statusElement ||
      !playerCountElement ||
      !onlinePlayersElement ||
      !onlineIcon ||
      !offlineIcon ||
      !errorIcon
    ) {
      console.error("Some required elements are missing in the DOM.");
      return;
    }

    // (Optional) Hide all icons to ensure only the correct one shows.
    // This is extra safety even if your CSS has them set to display: none.
    onlineIcon.style.display = "none";
    offlineIcon.style.display = "none";
    errorIcon.style.display = "none";

    // Create an AbortController to cancel the fetch if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

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

        if (data.players?.list) {
          onlinePlayersElement.innerHTML = "";
          data.players.list.forEach((player) => {
            const img = document.createElement("img");
            img.src = `https://mc-heads.net/avatar/${player}/32`;
            img.alt = player;
            img.title = player;
            img.className = "player-head";
            onlinePlayersElement.appendChild(img);
          });
        }
      } else {
        statusElement.textContent = "Offline";
        statusElement.className = "status-offline";
        statusElement.style.color = "#e81c1c";
        playerCountElement.textContent = `Players: 0/0`;
        playerCountElement.className = "status-offline";
        onlinePlayersElement.innerHTML = "";
        offlineIcon.style.display = "block";
      }
    } catch (error) {
      console.error("Failed to fetch server status:", error);
      statusElement.textContent = "Status Unknown";
      statusElement.style.color = "#e81c1c";
      playerCountElement.textContent = `Players: 0/0`;
      onlinePlayersElement.innerHTML = "";
      errorIcon.style.display = "block";
    }
  }

  // Check status every 10 seconds
  setInterval(checkServerStatus, 10000);
  // Check immediately when page loads
  checkServerStatus();
});
