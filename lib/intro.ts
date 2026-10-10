// Coordinates the first-visit intro with the Loader.
// html[data-loader]: unset = loader running, "done" = loader finished, "skip" = no loader this visit.

export const INTRO_EVENT = "tm:intro";

// True only while the loader is on screen, i.e. the intro animation should play when it ends.
export const introPending = () => document.documentElement.dataset.loader === undefined;

// Runs cb when the loader finishes (or right away if there is no loader). Returns a cleanup.
export function onIntro(cb: () => void) {
  if (!introPending()) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}
