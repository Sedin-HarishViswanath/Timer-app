import Timer from './Timer.js';
import createUI from './UI.js';
 
const modeLabel = document.getElementById('modeLabel');
const timeDisplay = document.getElementById('timeDisplay');
const statusText = document.getElementById('statusText');
const sessionGif = document.getElementById('sessionGif');
const pausePopImage = document.getElementById('pausePopImage');
 
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
 
const ui = createUI({ modeLabel, timeDisplay, statusText, sessionGif, pausePopImage });
 
const timer = new Timer({
  onTick: (snapshot) => ui.renderTick(snapshot),
  onModeChange: (snapshot) => ui.renderMode(snapshot),
  onStateChange: (snapshot) => ui.renderState(snapshot),
});
 
ui.renderInitial(timer.snapshot());
 
document.body.dataset.mode = 'work';
 
startBtn.addEventListener('click', () => {
  ui.hidePauseVisual();
  timer.start();
});
 
pauseBtn.addEventListener('click', () => {
  timer.pause();
  ui.showPauseVisual();
});
 
resetBtn.addEventListener('click', () => {
  ui.hidePauseVisual();
  timer.reset();
  ui.renderState({ running: false });
});