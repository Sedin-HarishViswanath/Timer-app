export default function createUI({ modeLabel, timeDisplay, statusText, sessionGif, pausePopImage }) {
  const MODE_LABEL = {
    work: 'Work Session',
    break: 'Break Session',
  };

  const MODE_GIF = {
    work: './assets/time-is-up-rabbit-time.gif',
    break: './assets/videoframe_7018.gif',
  };

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function renderTick({ remainingSeconds }) {
    timeDisplay.textContent = formatTime(remainingSeconds);
  }

  function renderMode({ mode }) {
    hidePauseVisual();
    modeLabel.textContent = MODE_LABEL[mode];
    sessionGif.src = MODE_GIF[mode];
    document.body.dataset.mode = mode;
  }

  function renderState({ running }) {
    statusText.textContent = running ? 'Running' : 'Paused';
  }

  function renderInitial({ mode, remainingSeconds }) {
    renderMode({ mode });
    renderTick({ remainingSeconds });
    statusText.textContent = 'Ready';
  }

  function showPauseVisual() {
    pausePopImage.classList.remove('is-visible');
    void pausePopImage.offsetWidth;
    pausePopImage.classList.add('is-visible');
  }

  function hidePauseVisual() {
    pausePopImage.classList.remove('is-visible');
  }

  return {
    renderTick,
    renderMode,
    renderState,
    renderInitial,
    showPauseVisual,
    hidePauseVisual,
  };
}
