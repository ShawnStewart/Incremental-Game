let gameData = {
  startTime: null,
  widgetTotal: 0,
  widgetCount: 0
};

const widgetCount = document.getElementById("widgetCount");
setInterval(() => {
  widgetCount.innerHTML = gameData.widgetCount;
}, 1);

widgetButton = () => {
  const progressBar = document.getElementById("widgetProgress__Bar");
  const btn = document.getElementById("widgetButton");
  btn.disabled = true;
  let progress = 0;
  const widgetInterval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(widgetInterval);
      btn.disabled = false;
      gameData.widgetCount++;
      progressBar.style.width = "0%";
    } else {
      progress++;
      progressBar.style.width = `${progress}%`;
    }
  }, 20);
};
