const WORK_SECONDS = 1 * 60;
const BREAK_SECONDS = 5 * 60;
 
export default class Timer {
  #remainingSeconds;
  #intervalId;
  #mode;
 
  constructor({ onTick, onModeChange, onStateChange } = {}) {
    this.#remainingSeconds = WORK_SECONDS;
    this.#intervalId = null;
    this.#mode = 'work';
 
    this.onTick = typeof onTick === 'function' ? onTick : () => {};
    this.onModeChange = typeof onModeChange === 'function' ? onModeChange : () => {};
    this.onStateChange = typeof onStateChange === 'function' ? onStateChange : () => {};
  }
 
  start() {
    if (this.#intervalId) {
      return;
    }
 
    this.onStateChange({ running: true, mode: this.#mode });
 
    this.#intervalId = window.setInterval(() => {
      this.#remainingSeconds -= 1;
      this.onTick(this.snapshot());
 
      if (this.#remainingSeconds <= 0) {
        this.#switchMode();
      }
    }, 1000);
  }
 
  pause() {
    if (!this.#intervalId) {
      return;
    }
 
    window.clearInterval(this.#intervalId);
    this.#intervalId = null;
    this.onStateChange({ running: false, mode: this.#mode });
  }
 
  reset() {
    this.pause();
    this.#mode = 'work';
    this.#remainingSeconds = WORK_SECONDS;
    this.onModeChange(this.snapshot());
    this.onTick(this.snapshot());
  }
 
  snapshot() {
    return {
      mode: this.#mode,
      remainingSeconds: this.#remainingSeconds,
      running: Boolean(this.#intervalId),
    };
  }
 
  #switchMode() {
    this.#mode = this.#mode === 'work' ? 'break' : 'work';
    this.#remainingSeconds = this.#mode === 'work' ? WORK_SECONDS : BREAK_SECONDS;
    this.onModeChange(this.snapshot());
    this.onTick(this.snapshot());
  }
}
 