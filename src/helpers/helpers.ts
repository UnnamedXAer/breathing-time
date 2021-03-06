export function beforeWindowUnloadHander(ev: BeforeUnloadEvent): boolean {
  ev.preventDefault();
  ev.returnValue = true;
  return true;
}

// for e2e tests
beforeWindowUnloadHander["e2eName"] = "beforeWindowUnloadHander";

export function canShareContent(): boolean {
  return !!navigator.clipboard || !!navigator.share;
}
