let gameData = {
  timeStamp: Date.now(),
  thisSession: 0,
  timePlayed: 0,
  widgetTotal: 0,
  widgetCount: 0
};

// Check for saved game
if (localStorage.gameData) {
  gameData = JSON.parse(localStorage.gameData);
  gameData.timeStamp = Date.now();
}

const widgetCount = document.getElementById("widgetCount");
const widgetTotal = document.getElementById("widgetTotal");

// Game Update
setInterval(() => {
  console.log("updating", gameData);
  widgetCount.innerHTML = gameData.widgetCount;
  widgetTotal.innerHTML = gameData.widgetTotal;
  if (gameData.widgetTotal > 0) {
    gameData.thisSession = parseInt((Date.now() - gameData.timeStamp) / 1000);
  }
}, 100);

// Game save
setInterval(() => {
  gameData.timePlayed += gameData.thisSession;
  gameData.timeStamp = Date.now() - 1000;
  localStorage.setItem("gameData", JSON.stringify(gameData));
}, 20000);

widgetButton = () => {
  if (!gameData.widgetTotal) {
    console.log("first click");
    gameData.timeStamp = Date.now();
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

clearLocalStorage = () => {
  localStorage.removeItem("gameData");
  location.reload();
};
