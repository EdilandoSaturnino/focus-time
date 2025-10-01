function updateClock(nowDate) {
  const now = nowDate || new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

let timerIntervalId = null;
let timerEndTs = null;
let timerRemainingMs = 0;
let timerRunning = false;

const displayEl = document.getElementById("timer-display");
const hInput = document.getElementById("timer-h");
const mInput = document.getElementById("timer-m");
const sInput = document.getElementById("timer-s");
const toggleBtn = document.getElementById("timer-toggle");
const resetBtn = document.getElementById("timer-reset");
const timerRoot = document.getElementById("timer");

function formatDuration(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const hh = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function readInputsToMs() {
  const h = Math.max(0, parseInt(hInput.value || "0", 10));
  let m = Math.max(0, parseInt(mInput.value || "0", 10));
  let s = Math.max(0, parseInt(sInput.value || "0", 10));
  if (!Number.isFinite(m)) m = 0;
  if (!Number.isFinite(s)) s = 0;
  m = Math.min(59, m);
  s = Math.min(59, s);
  return (h * 3600 + m * 60 + s) * 1000;
}

function updateDisplay(ms) {
  displayEl.textContent = formatDuration(ms);
}

function setInitialFromInputs() {
  timerRemainingMs = readInputsToMs();
  updateDisplay(timerRemainingMs);
}

function clearTimerInterval() {
  if (timerIntervalId !== null) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
}

function onTick() {
  const now = Date.now();
  const remaining = Math.max(0, timerEndTs - now);
  updateDisplay(remaining);
  document.getElementById("clock").textContent = formatDuration(remaining);
  if (remaining <= 0) {
    clearTimerInterval();
    timerRunning = false;
    toggleBtn.textContent = "Iniciar";
    timerRoot.classList.add("done");
    try { document.title = "⏰ Tempo esgotado"; } catch (_) {}
    updateClock(new Date(now));
  }
}

function startTimer() {
  if (timerRunning) return;
  timerRoot.classList.remove("done");
  if (timerRemainingMs <= 0) {
    timerRemainingMs = readInputsToMs();
  }
  if (timerRemainingMs <= 0) return;
  timerEndTs = Date.now() + timerRemainingMs;
  timerRunning = true;
  toggleBtn.textContent = "Pausar";
  clearTimerInterval();
  timerIntervalId = setInterval(onTick, 250);
  onTick();
}

function pauseTimer() {
  if (!timerRunning) return;
  timerRemainingMs = Math.max(0, timerEndTs - Date.now());
  timerRunning = false;
  toggleBtn.textContent = "Retomar";
  clearTimerInterval();
  updateClock();
}

function resetTimer() {
  timerRoot.classList.remove("done");
  pauseTimer();
  toggleBtn.textContent = "Iniciar";
  setInitialFromInputs();
  try { document.title = "Focus Time"; } catch (_) {}
  updateClock();
}

toggleBtn.addEventListener("click", function () {
  if (timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", function () {
  resetTimer();
});

[hInput, mInput, sInput].forEach(function (el) {
  el.addEventListener("input", function () {
    if (!timerRunning) {
      setInitialFromInputs();
    }
  });
});

setInitialFromInputs();

setInterval(function () { if (!timerRunning) updateClock(); }, 1000);
updateClock();


