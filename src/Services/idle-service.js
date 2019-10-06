let _timeoutId;
let _idleCallback = null;
let _notIdleEvents = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart"
];

// Adjust time for idle timer.
let _FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

const IdleService = {
  // Sets the idle timeout.
  setIdleCallback(idleCallback) {
    _idleCallback = idleCallback;
  },
  // Cancels timeout and establishes a new idle timeout.
  // Takes on an event activity arg.
  resetIdleTimer(ev) {
    clearTimeout(_timeoutId);

    _timeoutId = setTimeout(_idleCallback, _FIVE_MINUTES_IN_MS);
  },
  // Detects keyboard and mouse activity on app.
  registerIdleTimerResets() {
    _notIdleEvents.forEach(event =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
  // Stops listening for activity on app.
  unRegisterIdleResets() {
    clearTimeout(_timeoutId);
    _notIdleEvents.forEach(event =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    );
  }
};

export default IdleService;
