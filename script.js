let seconds = 0;
let minutes = 0;
let timer;
let running = false;

function updateDisplay() {
  document.getElementById("counter").textContent = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

document.getElementById("start").addEventListener("click", function () {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      updateDisplay();
    }, 1000);
  }
});

document.getElementById("pause").addEventListener("click", function () {
  clearInterval(timer);
  running = false;
});

document.getElementById("reset").addEventListener("click", function () {
  clearInterval(timer);
  running = false;
  seconds = 0;
  minutes = 0;
  updateDisplay();
});

updateDisplay(); // Inicializa a exibição
