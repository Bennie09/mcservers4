document.addEventListener("DOMContentLoaded", () => {
  async function checkServerStatus() {
    const serverIP = "should-tourist.gl.joinmc.link";
    const activePlayersContainer = document.querySelector(".active-players ul");
    const allPlayerItems = document.querySelectorAll(
      ".all-players .player-item"
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.online && data.players && data.players.list) {
        activePlayersContainer.innerHTML = "";

        const onlinePlayersSet = new Set(
          data.players.list.map((p) => p.toLowerCase())
        );

        data.players.list.forEach((player) => {
          const li = document.createElement("li");
          li.classList.add("player-item", "active");
          const img = document.createElement("img");
          img.src = `https://mc-heads.net/avatar/${player}/32`;
          img.alt = player;
          img.title = player;
          img.className = "player-head";
          li.appendChild(img);
          li.appendChild(document.createTextNode(" " + player));
          activePlayersContainer.appendChild(li);
        });

        allPlayerItems.forEach((item) => {
          const img = item.querySelector("img");
          if (!img) return;
          const playerName = img.alt.toLowerCase();
          if (onlinePlayersSet.has(playerName)) {
            item.classList.remove("inactive");
            item.classList.add("active");
          } else {
            item.classList.remove("active");
            item.classList.add("inactive");
          }
        });
      } else {
        activePlayersContainer.innerHTML = "";

        const noPlayersHeading = document.createElement("h4");
        noPlayersHeading.textContent = "No Active Players";
        activePlayersContainer.appendChild(noPlayersHeading);

        allPlayerItems.forEach((item) => {
          item.classList.remove("active");
          item.classList.add("inactive");
        });
      }
    } catch (error) {
      console.error("Error fetching server status:", error);
      activePlayersContainer.innerHTML = "";
      allPlayerItems.forEach((item) => {
        item.classList.remove("active");
        item.classList.add("inactive");
      });
    }
  }

  checkServerStatus();
  setInterval(checkServerStatus, 10000);
});
