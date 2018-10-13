let gameData = {
  startTime: null,
  widgetTotal: 0,
  widgetCount: 0
};

// Check for saved game
if (localStorage.gameData) {
  gameData = JSON.parse(localStorage.gameData);
}

const widgetCount = document.getElementById("widgetCount");
const widgetTotal = document.getElementById("widgetTotal");

setInterval(() => {
  localStorage.setItem("gameData", JSON.stringify(gameData));
  widgetCount.innerHTML = gameData.widgetCount;
  widgetTotal.innerHTML = gameData.widgetTotal;
}, 100);

widgetButton = () => {
  // Set start date if first click.
  if (!gameData.startTime) {
    gameData.startTime = Date.now();
  }

  const progressBar = document.getElementById("widgetProgress");
  const btn = document.getElementById("widgetButton");
  btn.disabled = true;
  let progress = 0;
  const widgetInterval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(widgetInterval);
      btn.disabled = false;
      gameData.widgetCount++;
      gameData.widgetTotal++;
      progressBar.style.width = "0%";
    } else {
      progress++;
      progressBar.style.width = `${progress}%`;
    }
  }, 20);
};
