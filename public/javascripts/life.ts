import Grid from "./lib/grid.js";
import { attachStartStop, attachResetListener, attachGridInteractionEvents } from "./event-listeners.js";
import lifeCycle from "./cycle.js";
import { attachSocketHandler } from "./socket_stuff.js";

document.addEventListener("DOMContentLoaded", () => {
  const period = 300;
  const gridObject = new Grid();
  // grid.birthCells([[10, 10], [11, 10],[12, 10]]);

  attachResetListener(gridObject.reset.bind(gridObject));
  attachStartStop((pauseFunction) => lifeCycle(gridObject, pauseFunction), period);
  attachGridInteractionEvents(gridObject);
  attachSocketHandler(gridObject);
})
