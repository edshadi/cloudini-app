// we need to communicate/send Gmail's GLOBALS to our content script.
document.dispatchEvent(new CustomEvent('Gmail-loaded', {
  detail: GLOBALS
}));
