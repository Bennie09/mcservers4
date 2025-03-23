async function checkServerStatus() {
  const serverIP = "quite-calculate.gl.joinmc.link";
  const statusElement = document.getElementById("server-status");
  const playerCountElement = document.getElementById("player-count");
  const onlinePlayersElement = document.getElementById("online-players");
  // Removed serverIconElement reference

  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await response.json();

    if (data.online) {
      // Server status
      statusElement.textContent = "✅ Online";
      statusElement.className = "status-online";

      // Player count
      const online = data.players?.online || 0;
      const max = data.players?.max || 0;
      playerCountElement.textContent = `Players: ${online}/${max}`;
      playerCountElement.className = "status-online";

      // Online players with avatars
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

      // Removed server icon section
    }
  } catch (error) {
    console.error("Failed to fetch server status:", error);
    statusElement.textContent = "❌ Status Unknown";
    statusElement.style.color = "#ff4444";
  }
}

// Check status every 10 seconds instead of 30
setInterval(checkServerStatus, 500);

// Check immediately when page loads
window.onload = checkServerStatus;

console.log("Connected!!!!!");
