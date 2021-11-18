export function beforeWindowUnloadHander(ev: BeforeUnloadEvent) {
  console.log("real event -> beforeWindowUnloadHander");
  ev.preventDefault();
  ev.returnValue = true;
  return true;
}

// for e2e tests
beforeWindowUnloadHander["e2eName"] = "beforeWindowUnloadHander";
