let gameData = {
  timeStamp: Date.now(),
  thisSession: 0,
  timePlayed: 0,
  widgetTotal: 0,
  widgetCount: 0,
  options: {
    "0": { value: 1, time: 25 }
  },
  materialCount: 1000,
  wallet: 0
};

// Check for saved game
if (localStorage.gameData) {
  gameData = JSON.parse(localStorage.gameData);
  gameData.timeStamp = Date.now();
}

const timePlayed = document.getElementById("timePlayed");
const widgetTotal = document.getElementById("widgetTotal");
const widgetCount = document.getElementById("widgetCount");
const materialCount = document.getElementById("materialCount");
const wallet = document.getElementById("wallet");

// Game Update
setInterval(() => {
  // console.log("updating", gameData);
  timePlayed.innerHTML = `${Math.floor(
    (gameData.thisSession + gameData.timePlayed) / 60
  )} minutes, ${(gameData.thisSession + gameData.timePlayed) % 60} seconds`;
  widgetTotal.innerHTML = gameData.widgetTotal;
  widgetCount.innerHTML = gameData.widgetCount;
  materialCount.innerHTML = gameData.materialCount;
  wallet.innerHTML = gameData.wallet;
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

  if (gameData.materialCount >= 25) {
    gameData.materialCount -= 25;
    const progressBar = document.getElementById("widgetProgress");
    const btn = document.getElementById("widgetButton");

    progressBarUpdate(
      progressBar,
      btn,
      gameData.options["0"].value,
      gameData.options["0"].time
    );
  }
};

progressBarUpdate = (bar, button, value, time) => {
  button.disabled = true;
  let progress = 0;
  const progressInterval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(progressInterval);
      button.disabled = false;
      gameData.widgetCount += value;
      gameData.widgetTotal += value;
      bar.style.width = "0%";
    } else {
      progress++;
      bar.style.width = `${progress}%`;
    }
  }, time);
};

upgrade = () => {
  if (gameData.widgetCount >= 10) {
    console.log("upgrading!!");
    gameData.widgetCount -= 10;
    gameData.options["0"].time *= 0.5;
  }
  console.log("insufficient funz");
};

clearLocalStorage = () => {
  localStorage.removeItem("gameData");
  location.reload();
};
